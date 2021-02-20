import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextWithIcon from "../TextWithIcon";

const Tabs = ({ leagueName, selected }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");
  const navTabs = useRef(null);
  const [currentTab, setCurrentTab] = useState(selected);
  const selectedTabRef = useRef(null);

  useEffect(() => {
    updateActiveTab(selectedTabRef);
  }, [currentTab, leagueName]);

  useEffect(() => {
    setCurrentTab(selected);
  }, [leagueName]);

  return (
    <section className="nav__tabs" ref={navTabs}>
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
        ref={selected === tabNameLowerCase ? selectedTabRef : null}
        to={`/${leagueTrimmed}/${tabNameLowerCase}`}
        className="nav__tab"
        onClick={() => setCurrentTab(tabNameLowerCase)}
      >
        <TextWithIcon textContent={tabName} pathData={iconData} />
      </Link>
    );
  }

  function updateActiveTab({ current: currentTab }) {
    const { x, width } = currentTab.getBoundingClientRect();
    navTabs.current.style.setProperty("--active-tab-position", `${x - 12}px`);
    navTabs.current.style.setProperty("--active-tab-width", `${width + 24}px`);
    currentTab.classList.add("nav__tab--active");
  }
};

export default Tabs;
