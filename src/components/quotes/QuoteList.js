import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, asc) => {
  return quotes.sort((quoteA, quoteB) => {
    if (asc) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const [sortedQuotes, setSortedArray] = useState(props.quotes);
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAsc = queryParams.get("sort") === "asc";

  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAsc ? `desc` : "asc"}`,
    });
    setSortedArray(() => sortQuotes(props.quotes, isSortingAsc));
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          sort {isSortingAsc ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
            likes={quote.likes}
            dislikes={quote.dislikes}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
