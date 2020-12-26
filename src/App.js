import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
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
        <Landing path="/" />
        <Matches path="/:league/matches" />
        <Standings path="/:league/standings" />
        <Scorers path="/:league/scorers" />
        <Teams path="/:league/teams" />
      </Router>
      <Loader />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
