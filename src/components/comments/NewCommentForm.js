import { useEffect, useRef } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import { getAuthToken } from "../../lib/UserSideAuth";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;
  const token = getAuthToken();

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!token) {
      window.confirm("you are not allowed to add a comment");
    } else {
      sendRequest({
        text: commentTextRef.current.value,
        quoteId: props.quoteId,
      });
    }

    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={` centered ${classes.actions}`}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
