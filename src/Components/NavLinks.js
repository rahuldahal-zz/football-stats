import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ currentSeason, leagueName, selected }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");

  useEffect(() => {
    updateActiveLink(document.querySelector(`.nav__link--${selected}`));
  }, []);

  return (
    <section className="nav__links">
      <div className="wrapper">
        <Link
          to={`/${leagueTrimmed}/matches`}
          state={{ currentSeason }}
          className="nav__link nav__link--matches"
        >
          <i className="fas fa-dumbbell"></i>
          <span>Matches</span>
        </Link>

        <Link
          to={`/${leagueTrimmed}/scorers`}
          state={{ currentSeason }}
          className="nav__link nav__link--scorers"
        >
          <i className="fas fa-futbol"></i>
          <span>Scorers</span>
        </Link>

        <Link
          to={`/${leagueTrimmed}/standings`}
          state={{ currentSeason }}
          className="nav__link nav__link--standings"
        >
          <i className="fas fa-table"></i>
          <span>Standings</span>
        </Link>
      </div>
    </section>
  );

  function updateActiveLink(link) {
    const navLinks = document.querySelector(".nav__links");
    const { x, width } = link.getBoundingClientRect();
    navLinks.style.setProperty("--active-link-position", `${x - 8}px`);
    navLinks.style.setProperty("--active-link-width", `${width + 16}px`);
    console.log(link, x, width);
  }
};

export default Nav;
