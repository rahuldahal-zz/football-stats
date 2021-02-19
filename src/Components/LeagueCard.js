import React from "react";
import { Link } from "react-router-dom";

const LeagueCard = ({ leagueName }) => {
  return (
    <Link
      to={`/${leagueName}/matches`}
      className="leagues__button clickable"
      title={leagueName}
    >
      <img
        src={`https://res.cloudinary.com/rdaahal/image/upload/v1609243719/FootballStats/Leagues/${leagueName}.png`}
        alt={`${leagueName} logo`}
        className="leagues__image"
      />
    </Link>
  );
};

export default LeagueCard;
