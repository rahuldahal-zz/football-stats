import React, { useEffect, useState } from "react";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import dateDifference from "../utils/dateDifference";
import { showLoader, hideLoader } from "../utils/preloader";
import Nav from "./Nav";
import Header from "./Header";

const leagueDetails = new LeagueDetails();

function Countdown({ utcDate, status, fullTime }) {
  return (
    <div className="match__countdown">
      <em className="match__status">
        {status === "FINISHED"
          ? `Finished ${fullTime.homeTeam} : ${fullTime.awayTeam}`
          : dateDifference({
              date: new Date(utcDate),
              time: "future",
            })}
      </em>
      <i className="fas fa-bell match__bell"></i>
    </div>
  );
}

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
    changeLeagueTheme(league);
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
    return (
      <>
        <Header leagueName={leagueFullName} />
        <Nav leagueName={league} selected="matches" />

        <div className="matches">
          {matches.map((match) => {
            let { homeTeam, awayTeam, utcDate, status, score } = match;
            const date = new Date(utcDate);
            homeTeam = shortNames.data.find((name) => name.id === homeTeam.id);
            awayTeam = shortNames.data.find((name) => name.id === awayTeam.id);

            return (
              <div
                key={match.id}
                className="match"
                role="button"
                tabIndex="0"
                onFocus={(e) => toggleCountdown(e)}
                onBlur={(e) => toggleCountdown(e)}
              >
                <Team homeTeam={homeTeam} awayTeam={awayTeam} />
                <Countdown
                  utcDate={utcDate}
                  status={status}
                  fullTime={score.fullTime}
                />
                <small className="match__date">{date.toLocaleString()}</small>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

function Team({ homeTeam, awayTeam }) {
  return (
    <div className="team">
      <div className="team__home">
        <img
          src={homeTeam.crestUrl}
          alt={`${homeTeam.shortName} logo`}
          onLoad={(e) => e.target.classList.add("team__logo--loaded")}
          className="team__logo"
        />
        <h3 className="team__name">{homeTeam.shortName}</h3>
      </div>
      <strong>v/s</strong>
      <div className="awayTeam">
        <img
          src={awayTeam.crestUrl}
          alt={`${awayTeam.shortName} logo`}
          onLoad={(e) => e.target.classList.add("team__logo--loaded")}
          className="team__logo"
        />
        <h3 className="team__name">{awayTeam.shortName}</h3>
      </div>
    </div>
  );
}

function toggleCountdown(e) {
  e.currentTarget.classList.toggle("match--active");
}

function changeLeagueTheme(leagueName) {
  const root = document.documentElement;
  root.style.setProperty(
    "--leagueTheme",
    LeagueDetails.prototype.getHexColor(leagueName)
  );
  root.style.setProperty(
    "--leagueThemeRGB",
    LeagueDetails.prototype.getRGBColor(leagueName)
  );
  root.style.setProperty(
    "--leagueAccent",
    LeagueDetails.prototype.getAccentColor(leagueName)
  );
}

export default Matches;
