import React, { useEffect, useState } from "react";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import { showLoader, hideLoader } from "../utils/preloader";
import Nav from "./Nav";
import Header from "./Header";

const leagueDetails = new LeagueDetails();

const Matches = ({ league }) => {
  const leagueId = leagueDetails.getId(league);
  const leagueFullName = leagueDetails.getFullName(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchDay, setMatchDay] = useState(null);
  const [shortNames, setShortNames] = useState({});

  useEffect(() => {
    setMatchDay(null);
  }, [league]);

  useEffect(() => {
    matchDay === null &&
      fetchData(null, leagueId)
        .then((leagueDetails) => {
          setMatchDay(leagueDetails.currentSeason.currentMatchday);
          return LocalStorage.prototype.isTeamNamesOnLocalStorage(
            leagueId,
            leagueDetails.currentSeason.startDate
          );
        })
        .then((response) => {
          setShortNames({ league: leagueId, data: response });
        })
        .catch((err) => console.log(err));
  }, [matchDay]);

  useEffect(() => {
    shortNames.league &&
      fetchData("matches", leagueId, { matchday: matchDay }).then(
        (result) => {
          setMatches(result.matches);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [shortNames]);

  useEffect(() => {
    if (shortNames.league !== leagueId) {
      return setIsLoaded(false);
    } else {
      hideLoader();
    }
  }, [league, isLoaded]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded || shortNames.league !== leagueId) {
    showLoader();
    return null;
  } else {
    console.log("sn", shortNames.league);
    return (
      <>
        <Header leagueName={leagueFullName} />
        <Nav leagueName={league} />

        <div className="matches">
          {matches.map((match) => {
            let { homeTeam, awayTeam, utcDate } = match;
            const date = new Date(utcDate);
            homeTeam = shortNames.data.find((name) => name.id === homeTeam.id);
            awayTeam = shortNames.data.find((name) => name.id === awayTeam.id);

            return (
              <div key={match.id} className="match">
                <div className="team">
                  <div className="team__home">
                    <img
                      src={homeTeam.crestUrl}
                      alt={`${homeTeam.shortName} logo`}
                      onLoad={(e) =>
                        e.target.classList.add("team__logo--loaded")
                      }
                      className="team__logo"
                    />
                    <h3 className="team__name">{homeTeam.shortName}</h3>
                  </div>
                  <strong>v/s</strong>
                  <div className="awayTeam">
                    <img
                      src={awayTeam.crestUrl}
                      alt={`${awayTeam.shortName} logo`}
                      onLoad={(e) =>
                        e.target.classList.add("team__logo--loaded")
                      }
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
      </>
    );
  }
};

export default Matches;
