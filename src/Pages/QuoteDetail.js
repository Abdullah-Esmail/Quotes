import { Fragment, useEffect } from "react";
import {
  Link,
  // Redirect,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
// import { getAuthToken } from "../lib/UserSideAuth";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;
  console.log(quoteId);
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const token = getAuthToken();
  // if (!token) {
  //   return Redirect("/login");
  // }

  if (status === "pending") {
    return (
      <div className="centerd">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centerd">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
        likes={loadedQuote.likes}
        dislikes={loadedQuote.dislikes}
      />
      <Route path={match.url} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/Comments`}>
            Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.url}/Comments`}>
        <Comments quoteId={quoteId} />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
