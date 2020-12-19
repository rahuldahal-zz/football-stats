import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Header from "./Header";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import { showLoader, hideLoader } from "../utils/preloader";

const leagueDetails = new LeagueDetails();

const Standings = ({ location, league }) => {
  const leagueId = leagueDetails.getId(league);
  const leagueFullName = leagueDetails.getFullName(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [standings, setStandings] = useState([]);
  const [standingsType, setStandingsType] = useState("TOTAL");
  const [shortNames, setShortNames] = useState({});

  useEffect(() => {
    setStandings(null);

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
      fetchData("standings", leagueId).then(
        (result) => {
          setStandings(result.standings[0]);
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
    console.log(standings);
    return (
      <>
        <Header leagueName={leagueFullName} />
        <Nav leagueName={league} selected="standings" />
        <div className="standingsOutput">
          <table className="standingsOutput__table">
            <thead>
              <tr>
                {window.innerWidth > 600 ? (
                  <>
                    {" "}
                    <th>Position</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drew</th>
                    <th>Lost</th>
                    <th>Goals For</th>
                    <th>Goals Against</th>
                    <th>Goal Diff.</th>
                    <th>Points</th>
                  </>
                ) : (
                  <>
                    {" "}
                    <th></th>
                    <th>T</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>P</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {standings.table.map((standing) => {
                let {
                  team,
                  position,
                  playedGames,
                  won,
                  draw,
                  lost,
                  goalsFor,
                  goalsAgainst,
                  points,
                } = standing;
                team = shortNames.data.find((name) => name.id === team.id);
                return (
                  <tr key={team.id}>
                    <td>{position}</td>
                    <td className="showTeamInfo" data-id={team.id}>
                      <img
                        src={team.crestUrl}
                        className="clubLogo"
                        alt={team.name}
                      />
                      <span className="teamName">{team.shortName}</span>
                    </td>
                    <td>{playedGames}</td>
                    <td>{won}</td>
                    <td>{draw}</td>
                    <td>{lost}</td>
                    <td>{goalsFor}</td>
                    <td>{goalsAgainst}</td>
                    <td>{goalsFor - goalsAgainst}</td>
                    <td className="points">{points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <aside className="standingsOutput__filter">
            <div className="filterButton">
              <button
                className="filterButton__btn filterButton__btn--active"
                data-table-type="TOTAL"
              >
                Overall
              </button>
              <button className="filterButton__btn" data-table-type="HOME">
                Home
              </button>
              <button className="filterButton__btn" data-table-type="AWAY">
                Away
              </button>
            </div>
          </aside>
        </div>
      </>
    );
  }
};

export default Standings;
