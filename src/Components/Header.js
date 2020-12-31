import { Link } from "react-router-dom";
import React from "react";

const Header = ({ leagueName }) => {
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
          <span>{leagueName}</span>
          <i className="fas fa-caret-down"></i>
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
        by{" "}
        <a href="https://rahuldahal.com.np" target="_blank" rel="noreferrer">
          Rahul Dahal
        </a>
        <a href="https://twitter.com/raahuldaahal">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://github.com/rahuldahal/football-stats">
          <i className="fab fa-github"></i>
        </a>
      </span>
    </header>
  );
};

export default Header;
