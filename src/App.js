import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Landing from "./Components/Landing";
import Matches from "./Components/Matches";
import "extended-normalize.css";
import "./assets/css/style.scss";

const App = function () {
  return (
    <Router>
      <Landing path="/" />
      <Matches path="/:league/matches" />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
