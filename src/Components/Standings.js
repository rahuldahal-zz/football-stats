import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavLinks from "./NavLinks";
import Header from "./Header";
import TeamInfo from "./TeamInfo";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import { showLoader, hideLoader } from "../utils/preloader";
import TweenLite from "gsap";

const leagueDetails = new LeagueDetails();

const Standings = () => {
  const { league } = useParams();
  const leagueId = leagueDetails.getId(league);
  const leagueFullName = leagueDetails.getFullName(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [standings, setStandings] = useState([]);
  const [standingsType, setStandingsType] = useState("TOTAL");
  const [shortNames, setShortNames] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      TweenLite.to("tbody tr", {
        css: { visibility: "visible" },
        delay: 0,
      });

      TweenLite.from("tbody tr", {
        duration: 0.5,
        opacity: 0,
        y: -10,
        stagger: 0.2,
        ease: "linear",
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    setStandings(null);
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
      fetchData("standings", leagueId).then(
        (result) => {
          setStandings(result.standings);
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
    let standingsTable;
    switch (standingsType) {
      case "HOME":
        standingsTable = standings[1].table;
        break;
      case "AWAY":
        standingsTable = standings[2].table;
        break;
      default:
        standingsTable = standings[0].table;
    }
    return (
      <>
        <nav className="nav">
          <Header leagueName={leagueFullName} />
          <NavLinks leagueName={league} selected="standings" />
        </nav>
        <main className="standingsOutput">
          <table className="standingsOutput__table">
            <thead>
              <tr>
                {window.innerWidth > 600 ? (
                  <>
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
              {standingsTable.map((standing) => {
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
                    <td>
                      <span
                        role="button"
                        tabIndex="0"
                        onClick={() => setSelectedTeam(team.id)}
                        onKeyUp={() => setSelectedTeam(team.id)}
                      >
                        <img
                          src={team.crestUrl}
                          className="clubLogo"
                          alt={team.name}
                        />
                        <span className="teamName">{team.shortName}</span>
                      </span>
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
                onFocus={(e) => standingsTypeHandler(e)}
              >
                Overall
              </button>
              <button
                className="filterButton__btn"
                data-table-type="HOME"
                onFocus={(e) => standingsTypeHandler(e)}
              >
                Home
              </button>
              <button
                className="filterButton__btn"
                data-table-type="AWAY"
                onFocus={(e) => standingsTypeHandler(e)}
              >
                Away
              </button>
            </div>
          </aside>
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

  function standingsTypeHandler(e) {
    document
      .querySelector(`[data-table-type=${standingsType}]`)
      .classList.remove("filterButton__btn--active");

    e.currentTarget.classList.add("filterButton__btn--active");

    setStandingsType(e.currentTarget.dataset.tableType);
  }
};

export default Standings;
