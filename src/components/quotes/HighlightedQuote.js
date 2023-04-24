import classes from "./HighlightedQuote.module.css";
import useReact from "../../hooks/my-hooks/use-react";
import { getAuthToken } from "../../lib/UserSideAuth";

const HighlightedQuote = (props) => {
  const [value, dispatch] = useReact(props.likes);
  const [disValue, disDispatch] = useReact(props.dislikes);
  const token = getAuthToken();

  const onLikeHandler = () => {
    if (token) {
      dispatch();
    } else {
      window.alert("you have to signin first");
    }
  };

  const onDisLikeHandler = () => {
    if (token) {
      disDispatch();
    } else {
      window.alert("you have to signin first");
    }
  };

  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>
        <div className={classes.auther}>{props.author}</div>
        <div className={classes.react}>
          <button
            className={classes.like}
            onClick={onLikeHandler}
            // disabled={!token ? true : false}
          >
            Like <span>{value}</span>
          </button>
          <button
            className={classes.dislike}
            onClick={onDisLikeHandler}
            // disabled={!token ? true : false}
          >
            DisLike <span>{disValue}</span>
          </button>
        </div>
      </figcaption>
    </figure>
  );
};

export default HighlightedQuote;
