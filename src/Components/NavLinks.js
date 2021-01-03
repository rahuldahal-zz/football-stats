import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

let isUpdatedOnce = false;

const Nav = ({ currentSeason, leagueName, selected }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");
  let navLinks = useRef(null);
  let selectedLink = useRef(null);

  useEffect(() => {
    updateActiveLink(selectedLink);
  }, []);

  return (
    <section className="nav__links" ref={(el) => (navLinks = el)}>
      <div className="wrapper">
        <Link
          ref={selected === "matches" ? (el) => (selectedLink = el) : null}
          to={`/${leagueTrimmed}/matches`}
          state={{ currentSeason }}
          className="nav__link nav__link--matches"
        >
          <i className="fas fa-dumbbell"></i>
          <span>Matches</span>
        </Link>

        <Link
          ref={selected === "scorers" ? (el) => (selectedLink = el) : null}
          to={`/${leagueTrimmed}/scorers`}
          state={{ currentSeason }}
          className="nav__link nav__link--scorers"
        >
          <i className="fas fa-futbol"></i>
          <span>Scorers</span>
        </Link>

        <Link
          ref={selected === "standings" ? (el) => (selectedLink = el) : null}
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
    const { x, width } = link.getBoundingClientRect();
    if (isUpdatedOnce) {
      navLinks.style.setProperty("--active-link-position", `${x - 8}px`);
      navLinks.style.setProperty("--active-link-width", `${width + 16}px`);
    } else {
      navLinks.style.setProperty("--active-link-position", `${x - 16}px`);
      navLinks.style.setProperty("--active-link-width", `${width + 24}px`);
      isUpdatedOnce = true;
    }
    link.classList.add("nav__link--active");
    console.log(x - 8, width + 16);
  }
};

export default Nav;
