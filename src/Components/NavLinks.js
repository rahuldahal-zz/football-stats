import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextWithIcon from "./TextWithIcon";

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
          <TextWithIcon
            textContent="Matches"
            pathData={["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"]}
          />
        </Link>

        <Link
          ref={selected === "scorers" ? (el) => (selectedLink = el) : null}
          to={`/${leagueTrimmed}/scorers`}
          state={{ currentSeason }}
          className="nav__link nav__link--scorers"
        >
          <TextWithIcon
            textContent="Scorers"
            pathData={["M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"]}
          />
        </Link>

        <Link
          ref={selected === "standings" ? (el) => (selectedLink = el) : null}
          to={`/${leagueTrimmed}/standings`}
          state={{ currentSeason }}
          className="nav__link nav__link--standings"
        >
          <TextWithIcon
            textContent="Standings"
            pathData={[
              "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
            ]}
          />
        </Link>
      </div>
    </section>
  );

  function updateActiveLink(link) {
    const { x, width } = link.getBoundingClientRect();
    navLinks.style.setProperty("--active-link-position", `${x - 12}px`);

    if (isUpdatedOnce) {
      navLinks.style.setProperty("--active-link-width", `${width + 16}px`);
    } else {
      navLinks.style.setProperty("--active-link-width", `${width + 24}px`);
      isUpdatedOnce = true;
    }
    link.classList.add("nav__link--active");
  }
};

export default Nav;
