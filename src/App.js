import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./Components/Landing";
import Matches from "./Components/Matches";
import Loader from "./Components/Loader";
import { hideLoader } from "./utils/preloader";
import Standings from "./Components/Standings";
import Scorers from "./Components/Scorers";
import Teams from "./Components/Teams";

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
        <Route path="/:league/teams" component={Teams} />
      </Router>
      <Loader />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
