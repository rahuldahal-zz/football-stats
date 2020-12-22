import React, { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import Header from "./Header";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import { showLoader, hideLoader } from "../utils/preloader";

const leagueDetails = new LeagueDetails();

const Scorers = ({ league }) => {
  const leagueId = leagueDetails.getId(league);
  const leagueFullName = leagueDetails.getFullName(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scorers, setScorers] = useState([]);
  const [shortNames, setShortNames] = useState({});

  useEffect(() => {
    setScorers(null);
    changeLeagueTheme(league);

    fetchData(null, leagueId)
      .then((leagueDetails) => {
        return LocalStorage.prototype.isTeamNamesOnLocalStorage(
          leagueId,
          leagueDetails.currentSeason.startDate
        );
      })
      .then((response) => {
        setShortNames({ league: leagueId, data: response });
      });
  }, [league]);

  useEffect(() => {
    shortNames.league &&
      fetchData("scorers", leagueId).then(
        (result) => {
          console.log(result);
          setScorers(result.scorers);
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
    console.log(scorers);
    return (
      <>
        <nav className="nav">
          <Header leagueName={leagueFullName} />
          <NavLinks leagueName={league} selected="scorers" />
        </nav>

        <main className="scorers">
          {scorers.map((scorer) => {
            const { name, nationality, position, dateOfBirth } = scorer.player;
            const team = shortNames.data.find(
              (name) => name.id === scorer.team.id
            );

            return (
              <div key={scorer.player.id} className="scorer">
                <h3 className="scorer__name">{name}</h3>
                <p className="position">
                  <i className="fas fa-users"></i>
                  {position}
                </p>
                <p className="country">
                  <i className="fas fa-flag"></i>
                  {nationality}
                </p>

                <div className="scorer__team">
                  <img src={team.crestUrl} alt={`${team.shortName} logo`} />
                  <em className="teamName">{team.shortName}</em>
                </div>

                <span className="scorer__age">
                  {new Date().getFullYear() -
                    new Date(dateOfBirth).getFullYear()}{" "}
                  yrs
                </span>
                <h1 className="scorer__goals">{scorer.numberOfGoals} Goals</h1>
              </div>
            );
          })}
        </main>
      </>
    );
  }
};

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

export default Scorers;
