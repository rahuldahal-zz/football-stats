import React from "react";
import LeagueDetails from "../../utils/leagueDetails";
import Header from "./Header";
import Tabs from "./Tabs";

const leagueDetails = new LeagueDetails();

export default function Nav({ leagueName, selectedTab }) {
  const leagueFullName = leagueDetails.getFullName(leagueName);

  return (
    <>
      <Header leagueFullName={leagueFullName} />
      <Tabs leagueName={leagueName} selected={selectedTab} />
    </>
  );
}
