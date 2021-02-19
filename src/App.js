import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./Screens/Landing";
import Matches from "./Screens/Matches";
import Loader from "./Screens/Loader";
import { hideLoader } from "./utils/preloader";
import Standings from "./Screens/Standings";
import Scorers from "./Screens/Scorers";

// CSS and SCSS

import "extended-normalize.css";
import "./assets/css/style.scss";

const App = function () {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/:league/matches" component={Matches} />
        <Route path="/:league/standings" component={Standings} />
        <Route path="/:league/scorers" component={Scorers} />
      </Router>
      <Loader />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
