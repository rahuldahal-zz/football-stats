import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextWithIcon from "../TextWithIcon";

const Tabs = ({ currentSeason, leagueName, selected }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");
  let navTabs = useRef(null);
  let selectedTab = useRef(null);

  useEffect(() => {
    updateActiveTab(selectedTab);
  }, []);

  return (
    <section className="nav__tabs" ref={(el) => (navTabs = el)}>
      <div className="wrapper">
        <Tab
          tabName="Matches"
          iconData={["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"]}
        />
        <Tab
          tabName="Scorers"
          iconData={["M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"]}
        />
        <Tab
          tabName="Standings"
          iconData={[
            "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
          ]}
        />
      </div>
    </section>
  );

  function Tab({ tabName, iconData }) {
    const tabNameLowerCase = tabName.toLowerCase();
    return (
      <Link
        ref={selected === tabNameLowerCase ? (el) => (selectedTab = el) : null}
        to={`/${leagueTrimmed}/${tabNameLowerCase}`}
        state={{ currentSeason }}
        className="nav__tab"
      >
        <TextWithIcon textContent={tabName} pathData={iconData} />
      </Link>
    );
  }

  function updateActiveTab(tab) {
    const { x, width } = tab.getBoundingClientRect();
    navTabs.style.setProperty("--active-tab-position", `${x - 12}px`);
    navTabs.style.setProperty("--active-tab-width", `${width + 24}px`);
    tab.classList.add("nav__tab--active");
  }
};

export default Tabs;
