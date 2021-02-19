import { Link } from "react-router-dom";
import React from "react";
import TextWithIcon from "../TextWithIcon";

const Header = ({ leagueFullName }) => {
  const GITHUB_PATH_DATA = [
    "M158 353c-3 0-4 2-4 4 1 2 2 3 5 2s5-2 4-4c0-2-2-3-5-2zM142 355c-3 0-5 1-5 3s2 4 5 3c3 0 5-1 5-3s-2-3-5-3zM120 354c-1 2 0 4 3 4 3 1 5 1 6-1 0-2-1-4-4-5s-5 0-5 2z",
    "M414 24a79 79 0 00-58-24H82C60 0 40 8 24 24A79 79 0 000 82v274c0 23 8 42 24 58s36 25 58 25h64l10-1c2 0 4-1 6-4 2-2 3-5 3-9v-20-29l-7 1-16 1-20-2c-6-1-13-4-19-8-6-5-10-11-12-18l-3-7-9-14c-4-5-8-9-12-11l-2-1a21 21 0 01-7-8c0-1 0-2 2-3l8-1h6l14 7c5 4 10 9 14 15 4 8 9 14 15 18 7 4 13 6 19 6l16-1 13-5c2-12 7-22 14-29l-29-5c-9-2-18-6-27-11a77 77 0 01-38-49c-4-13-6-27-6-43 0-23 8-43 23-59-7-17-6-37 2-58 5-2 14-1 24 4a172 172 0 0136 18 203 203 0 01110 0l11-7 26-12c10-4 18-5 23-3 9 21 10 41 3 58 15 16 22 36 22 59 0 16-2 30-6 43-4 12-9 22-15 30-6 7-14 14-23 19s-18 9-27 11l-29 5c10 9 15 22 15 41v68l1 8 5 4 5 1 7 1h64c23 0 42-9 58-25s25-35 25-58V82c0-22-9-42-25-58z",
    "M87 319c-2 1-1 3 0 5 2 2 4 2 5 1s1-3-1-5-3-2-4-1zM77 312c0 1 0 3 2 3h4c1-1 0-3-2-4l-4 1zM96 330c-2 1-2 3 0 5 1 3 3 4 4 2 2-1 2-3 0-5-1-2-3-3-4-2zM106 343c-2 2-2 4 1 6 2 2 4 2 5 0 2-1 2-3-1-5-2-2-4-3-5-1z",
  ];
  return (
    <header className="nav__header">
      <div
        className="nav__leagues"
        role="button"
        tabIndex="0"
        onFocus={(e) => {
          e.target.children[1] &&
            e.target.children[1].classList.toggle("dropdown--active");
        }}
      >
        <div className="selected">
          <TextWithIcon
            textContent={leagueFullName}
            pathData={["M19 9l-7 7-7-7"]}
            iconAlign="right"
            iconWidth="1.5rem"
            strokeWidth="4"
          />
        </div>
        <div className="dropdown">
          <Link to="/premierleague/matches" className="dropdown__item">
            Premier League
          </Link>
          <Link to="/laliga/matches" className="dropdown__item">
            La Liga
          </Link>
          <Link to="/bundesliga/matches" className="dropdown__item">
            Bundesliga
          </Link>
          <Link to="/seriea/matches" className="dropdown__item">
            Serie A
          </Link>
          <Link to="/ligueun/matches" className="dropdown__item">
            Ligue 1
          </Link>
        </div>
      </div>
      <span className="author">
        <a href="https://github.com/rahuldahal/football-stats">
          <TextWithIcon
            textContent="Github Repo"
            pathData={GITHUB_PATH_DATA}
            viewBox="0 0 438.5 438.5"
          />
        </a>
      </span>
    </header>
  );
};

export default Header;
