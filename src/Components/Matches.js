import React, { useEffect, useState } from "react";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";

const leagueDetails = new LeagueDetails();

const Matches = ({ league }) => {
  const leagueId = leagueDetails.getId(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchDay, setMatchDay] = useState(1);
  const [shortNames, setShortNames] = useState([]);

  useEffect(() => {
    function fetchUpcomingMatches(matchDay) {
      fetchData("matches", leagueId, { matchday: matchDay }).then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setMatches(result.matches);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    }

    fetchData(null, leagueId)
      .then((leagueDetails) => {
        setMatchDay(leagueDetails.currentSeason.currentMatchday);
        return LocalStorage.prototype.isTeamNamesOnLocalStorage(
          leagueId,
          leagueDetails.currentSeason.startDate
        );
      })
      .then((response) => {
        setShortNames(response);
        fetchUpcomingMatches(matchDay);
      })
      .catch((err) => console.log(err));
  }, [leagueId, matchDay]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="matches">
        {matches.map((match) => {
          let { homeTeam, awayTeam, utcDate } = match;
          const date = new Date(utcDate);
          homeTeam = shortNames.find((name) => name.id === homeTeam.id);
          awayTeam = shortNames.find((name) => name.id === awayTeam.id);

          return (
            <div key={match.id} className="match">
              <div className="team">
                <div className="team__home">
                  <img
                    src={homeTeam.crestUrl}
                    alt={`${homeTeam.shortName}logo`}
                    className="team__logo"
                  />
                  <h3 className="team__name">{homeTeam.shortName}</h3>
                </div>
                <strong>v/s</strong>
                <div className="awayTeam">
                  <img
                    src={awayTeam.crestUrl}
                    alt={`${awayTeam.shortName}logo`}
                    className="team__logo"
                  />
                  <h3 className="team__name">{awayTeam.shortName}</h3>
                </div>
              </div>
              <small className="match__date">{date.toLocaleString()}</small>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Matches;
