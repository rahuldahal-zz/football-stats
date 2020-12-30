import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import dateDifference from "../utils/dateDifference";
import { showLoader, hideLoader } from "../utils/preloader";
import NavLinks from "./NavLinks";
import Header from "./Header";
import TeamInfo from "./TeamInfo";

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

const Matches = () => {
  const { league } = useParams();
  const leagueId = leagueDetails.getId(league);
  const leagueFullName = leagueDetails.getFullName(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchDay, setMatchDay] = useState(null);
  const [shortNames, setShortNames] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    setMatchDay(null);
    setShortNames({});
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
  }, [shortNames, matchDay]);

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
        <nav className="nav">
          <Header leagueName={leagueFullName} />
          <NavLinks leagueName={league} selected="matches" />
        </nav>

        <main className="matchesContainer">
          <header className="matchday">
            <h3 className="matchday__count">Matchday: {matchDay}</h3>
            <button
              className="matchday__picker"
              onClick={() => {
                setMatchDay(matchDay - 1);
                setIsLoaded(false);
              }}
            >
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: "1rem", marginLeft: "0" }}
              ></i>
              Previous
            </button>
            <button
              className="matchday__picker"
              onClick={() => {
                setMatchDay(matchDay + 1);
                setIsLoaded(false);
              }}
            >
              Next
              <i className="fas fa-arrow-right"></i>
            </button>
          </header>
          <section className="matches">
            {matches.map((match) => {
              let { homeTeam, awayTeam, utcDate, status, score } = match;
              const date = new Date(utcDate);
              homeTeam = shortNames.data.find(
                (name) => name.id === homeTeam.id
              );
              awayTeam = shortNames.data.find(
                (name) => name.id === awayTeam.id
              );

              return (
                <div
                  key={match.id}
                  className="match"
                  role="button"
                  tabIndex="0"
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
          </section>
        </main>
        {selectedTeam ? (
          <TeamInfo
            shortNames={shortNames}
            teamId={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        ) : (
          <TeamInfo />
        )}
      </>
    );
  }

  function Team({ homeTeam, awayTeam }) {
    return (
      <div className="team">
        <div
          className="team__home"
          role="button"
          tabIndex="0"
          onClick={() => setSelectedTeam(homeTeam.id)}
          onKeyUp={() => setSelectedTeam(homeTeam.id)}
        >
          <img
            src={homeTeam.crestUrl}
            alt={`${homeTeam.shortName} logo`}
            onLoad={(e) => e.target.classList.add("team__logo--loaded")}
            className="team__logo"
          />
          <h3 className="team__name">{homeTeam.shortName}</h3>
        </div>
        <strong>v/s</strong>
        <div
          className="awayTeam"
          role="button"
          tabIndex="0"
          onClick={() => setSelectedTeam(awayTeam.id)}
          onKeyUp={() => setSelectedTeam(awayTeam.id)}
        >
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
};

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
  root.style.setProperty(
    "--leagueText",
    LeagueDetails.prototype.getTextColor(leagueName)
  );
}

export default Matches;
