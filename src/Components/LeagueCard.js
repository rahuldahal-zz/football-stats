import React from "react";
import { Link } from "react-router-dom";

const LeagueCard = ({ leagueName }) => {
  const leagueTrimmed = leagueName.toLowerCase().replace(" ", "");
  return (
    <Link
      to={`/${leagueTrimmed}/matches`}
      className="leagues__button clickable"
      title={leagueName}
    >
      <img
        src={`https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/${leagueTrimmed}.png`}
        alt={`${leagueName} logo`}
        className="leagues__image"
      />
    </Link>
  );
};

export default LeagueCard;
