import { Fragment, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
// import { getAuthToken } from "../lib/UserSideAuth";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // const token = getAuthToken();
  // if (!token) {
  //   return Redirect("/login");
  // }

  if (status === "pending") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered foucused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return (
    <Fragment>
      <QuoteList quotes={loadedQuotes} />
    </Fragment>
  );
};

export default AllQuotes;
