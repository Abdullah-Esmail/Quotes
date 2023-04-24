import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <div className={classes.actions}>
        <div>
          <Link className="btn" to={`/quotes/${props.id}`}>
            View Fullscreen
          </Link>
        </div>
      </div>
    </li>
  );
};

export default QuoteItem;
