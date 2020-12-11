import React from "react";
import ReactDOM from "react-dom";
import {Router} from "@reach/router";
import "extended-normalize.css";
import "./assets/css/style.scss";


const App = function () {
  return (
      <div>
          <h1>FootballStats</h1>
	  <a href="https://footballstats.tk">Vanilla JS Version</a>
      </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
