import { useCallback, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = ({ quoteId }) => {
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  console.log(quoteId);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centerd">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} quoteId={quoteId} />;
  }

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!comments ? (
        <div className="centerd">
          <p>No comments were aded yet!</p>
        </div>
      ) : (
        comments
      )}
      <NewCommentForm quoteId={quoteId} onAddedComment={addCommentHandler} />
    </section>
  );
};

export default Comments;
