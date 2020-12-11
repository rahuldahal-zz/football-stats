import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Landing from "./Landing";
import "extended-normalize.css";
import "./assets/css/style.scss";

const App = function () {
  return (
    <Router>
      <Landing path="/" />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
