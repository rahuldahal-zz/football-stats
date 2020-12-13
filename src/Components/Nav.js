import React from "react";
import { Link } from "@reach/router";

const Nav = ({ leagueName }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");

  return (
    <nav className="nav">
      <Link
        to={`/${leagueTrimmed}/matches`}
        className="nav__link nav__link--active"
      >
        Matches
      </Link>
      <Link to={`/${leagueTrimmed}/teams`} className="nav__link">
        Teams
      </Link>
      <Link to={`/${leagueTrimmed}/scorers`} className="nav__link">
        Scorers
      </Link>
      <Link to={`/${leagueTrimmed}/standings`} className="nav__link">
        Standings
      </Link>
    </nav>
  );
};

export default Nav;
