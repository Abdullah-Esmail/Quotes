import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList = ({ comments, quoteId }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          text={comment.commentData.text}
          id={comment.id}
          quoteId={quoteId}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
