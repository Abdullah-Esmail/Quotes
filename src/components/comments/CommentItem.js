import { deletecomment } from "../../lib/api";
import classes from "./CommentItem.module.css";
import "../../My-Toolkit.css";
import { getAuthToken } from "../../lib/UserSideAuth";

const CommentItem = (props) => {
  const CommentId = `${props.id}`;
  const quoteId = `${props.quoteId}`;

  const deleteHandler = () => {
    if (getAuthToken()) {
      deletecomment(CommentId, quoteId);
    } else {
      window.alert("signin first");
    }
  };

  return (
    <li className={classes.item}>
      <p className={classes.p}>{props.text}</p>
      <button onClick={deleteHandler} className="m-btn">
        Delete
      </button>
    </li>
  );
};

export default CommentItem;
