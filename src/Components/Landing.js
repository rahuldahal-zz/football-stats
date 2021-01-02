import React, { useEffect, useRef } from "react";
import LeagueCard from "./LeagueCard";
import { TweenLite, Power3 } from "gsap";

const Landing = () => {
  useEffect(() => {
    TweenLite.to(".landing", {
      css: { visibility: "visible" },
      delay: 0,
    });
    TweenLite.from(".landing__title", {
      opacity: 0,
      y: -20,
      ease: "linear",
    });
    TweenLite.from(".leagues__button", {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.2,
      ease: "linear",
    });
  }, []);

  return (
    <main className="landing">
      <h1 className="landing__title">FootballStats</h1>
      <p className="landing__description">
        Football Statistics of Popular Leagues
      </p>
      <h3 className="landing__subtitle">Select the League</h3>

      <section className="leagues">
        <LeagueCard leagueName="premier league" />
        <LeagueCard leagueName="la liga" />
        <LeagueCard leagueName="serie a" />
        <LeagueCard leagueName="bundesliga" />
        <LeagueCard leagueName="ligue un" />
      </section>
    </main>
  );
};

export default Landing;
