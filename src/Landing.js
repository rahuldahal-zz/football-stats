import React from "react";
import LeagueCard from "./LeagueCard";

const Landing = () => {
  return (
    <main className="landing">
      <h1 className="landing__title">FootballStats</h1>
      <p className="landing__description">Football Statistics of Popular Leagues</p>
      <h3 className="landing__subtitle">Select the League</h3>

      <section className="leagues">
          <LeagueCard league="premier league"/>
          <LeagueCard league="la liga"/>
          <LeagueCard league="serie a"/>
          <LeagueCard league="bundesliga"/>
          <LeagueCard league="ligue one"/>
      </section>
    </main>
  );
};

export default Landing;
