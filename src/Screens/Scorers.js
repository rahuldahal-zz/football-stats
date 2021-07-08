import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamInfo from "./TeamInfo";
import LeagueDetails from "../utils/leagueDetails";
import { fetchData } from "../utils/fetchData";
import LocalStorage from "../utils/localStorage";
import { showLoader, hideLoader } from "../utils/preloader";
import TweenLite from "gsap";
import TextWithIcon from "../Components/TextWithIcon";
import Error from "../Components/Error";
import changeLeagueTheme from "../utils/changeLeagueTheme";

const leagueDetails = new LeagueDetails();

const Scorers = () => {
  const { league } = useParams();
  const leagueId = leagueDetails.getId(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scorers, setScorers] = useState([]);
  const [shortNames, setShortNames] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      TweenLite.to(".scorer", {
        css: { visibility: "visible" },
        delay: 0,
      });

      TweenLite.from(".scorer", {
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
          if (result.scorers.length > 0) {
            setScorers(result.scorers);
          } else {
            setError({
              message: "The league has not started yet.",
            });
          }
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
    const { message } = error;
    const options = { message };
    return <Error options={options} />;
  } else if (!isLoaded || shortNames.league !== leagueId) {
    showLoader();
    return null;
  } else {
    return (
      <>
        {/* <Nav leagueName={league} selectedTab="scorers" /> */}

        <main className="scorers container">
          <section className="scorers">
            {scorers.map((scorer) => {
              const {
                name,
                nationality,
                position,
                dateOfBirth,
              } = scorer.player;
              const team = shortNames.data.find(
                (name) => name.id === scorer.team.id
              );

              return (
                <div key={scorer.player.id} className="scorer">
                  <h3 className="scorer__name">{name}</h3>
                  <p className="position">
                    <TextWithIcon
                      textContent={position}
                      pathData={[
                        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                      ]}
                    />
                  </p>
                  <p className="country">
                    <TextWithIcon
                      textContent={nationality}
                      pathData={[
                        "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
                      ]}
                    />
                  </p>

                  <div
                    className="scorer__team"
                    role="button"
                    tabIndex="0"
                    onClick={() => setSelectedTeam(team.id)}
                    onKeyUp={() => setSelectedTeam(team.id)}
                  >
                    <img src={team.crestUrl} alt={`${team.shortName} logo`} />
                    <em className="teamName">{team.shortName}</em>
                  </div>

                  <span className="scorer__age">
                    {new Date().getFullYear() -
                      new Date(dateOfBirth).getFullYear()}{" "}
                    yrs
                  </span>
                  <h1 className="scorer__goals">
                    {scorer.numberOfGoals} Goals
                  </h1>
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
};

export default Scorers;
