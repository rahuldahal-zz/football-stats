import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import dateDifference from "../utils/dateDifference";
import { showLoader, hideLoader } from "../utils/preloader";
import TeamInfo from "./TeamInfo";
import { TweenLite, Power3 } from "gsap";
import { Tween } from "gsap/gsap-core";
import TextWithIcon from "../Components/TextWithIcon";
import Nav from "../Components/Nav/Nav";
import changeLeagueTheme from "../utils/changeLeagueTheme";

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
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchDay, setMatchDay] = useState(null);
  const [shortNames, setShortNames] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      // matchday header

      TweenLite.from(".matchday__count", {
        duration: 0.3,
        delay: 0.5,
        x: -20,
        opacity: 0,
        ease: "linear",
      });

      TweenLite.from(".matchday__picker", {
        duration: 0.5,
        delay: 0.5,
        y: -20,
        opacity: 0,
        ease: "linear",
      });

      // match card
      TweenLite.to(".match", {
        css: { visibility: "visible" },
        delay: 0,
      });
      TweenLite.from(".match", {
        duration: 0.5,
        delay: 0.5,
        opacity: 0,
        x: 20,
        stagger: 0.2,
        ease: "linear",
      });
    }
  }, [isLoaded]);

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
      isLoaded && hideLoader();
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
        {/* <Nav leagueName={league} selectedTab="matches" /> */}
        <main className="matchesWrap container">
          <header className="matchday">
            <h3 className="matchday__count">Matchday: {matchDay}</h3>
            <button
              className="matchday__picker"
              onClick={() => {
                setMatchDay(matchDay - 1);
                setIsLoaded(false);
              }}
            >
              <TextWithIcon
                textContent="Previous"
                pathData={["M7 16l-4-4m0 0l4-4m-4 4h18"]}
              />
            </button>
            <button
              className="matchday__picker"
              onClick={() => {
                setMatchDay(matchDay + 1);
                setIsLoaded(false);
              }}
            >
              <TextWithIcon
                textContent="Next"
                pathData={["M17 8l4 4m0 0l-4 4m4-4H3"]}
                iconAlign="right"
              />
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
                  <small className="match__date">
                    {/* {date.toLocaleString()} */}
                    {status === "FINISHED"
                      ? `Finished ${score.fullTime.homeTeam} : ${score.fullTime.awayTeam}`
                      : date.toLocaleString()}
                  </small>
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
          className="team__away"
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

export default Matches;
