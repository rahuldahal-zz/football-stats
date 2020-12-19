import React from "react";
import { Link } from "@reach/router";

const Nav = ({ currentSeason, leagueName, selected }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");

  return (
    <nav className="nav">
      <Link
        to={`/${leagueTrimmed}/matches`}
        state={{ currentSeason }}
        className={`nav__link ${
          selected === "matches" ? "nav__link--active" : ""
        }`}
      >
        Matches
      </Link>
      <Link
        to={`/${leagueTrimmed}/teams`}
        state={{ currentSeason }}
        className={`nav__link ${
          selected === "teams" ? "nav__link--active" : ""
        }`}
      >
        Teams
      </Link>
      <Link
        to={`/${leagueTrimmed}/scorers`}
        state={{ currentSeason }}
        className={`nav__link ${
          selected === "scorers" ? "nav__link--active" : ""
        }`}
      >
        Scorers
      </Link>
      <Link
        to={`/${leagueTrimmed}/standings`}
        state={{ currentSeason }}
        className={`nav__link ${
          selected === "standings" ? "nav__link--active" : ""
        }`}
      >
        Standings
      </Link>
    </nav>
  );
};

export default Nav;
