import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./Screens/Landing";
import Container from "./Components/Container";
import Loader from "./Components/Loader";
import { hideLoader } from "./utils/preloader";

// CSS and SCSS

import "extended-normalize.css";
import "./assets/css/style.scss";

const App = function () {
  return (
    <>
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/:league/:tab" component={Container} />
      </Router>
      <Loader />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
