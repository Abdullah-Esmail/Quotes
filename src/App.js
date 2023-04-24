import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AboutPage from "./Pages/AboutPage";

import AllQuotes from "./Pages/AllQuotes";
import Login from "./Pages/Login";
import NewQuote from "./Pages/NewQuote";
import QuoteDetail from "./Pages/QuoteDetail";

function App(props) {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="*">
          <div className="centered">
            <p>Page Not Found!</p>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
