import { useHistory } from "react-router-dom";

import { Fragment, useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
// import { getAuthToken } from "../lib/UserSideAuth";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quote) => {
    sendRequest(quote);
  };

  // const token = getAuthToken();
  // if (!token) {
  //   return Redirect("/login");
  // }
  return (
    <Fragment>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={addQuoteHandler}
      />
    </Fragment>
  );
};

export default NewQuote;
