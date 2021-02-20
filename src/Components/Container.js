import React from "react";
import { useParams } from "react-router-dom";
import Matches from "../Screens/Matches";
import Standings from "../Screens/Standings";
import Scorers from "../Screens/Scorers";
import Nav from "./Nav/Nav";

export default function Container() {
  const { league, tab } = useParams();
  let TabToRender = Matches;

  switch (tab) {
    case "scorers":
      TabToRender = Scorers;
      break;
    case "standings":
      TabToRender = Standings;
      break;
    default:
      TabToRender = Matches;
      break;
  }
  return (
    <>
      <Nav leagueName={league} selectedTab={tab} />
      <TabToRender />
    </>
  );
}
