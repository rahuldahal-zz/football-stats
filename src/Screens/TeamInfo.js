import React, { useState, useEffect } from "react";
import TextWithIcon from "../Components/TextWithIcon";
import { useParams } from "react-router-dom";

import { fetchData } from "../utils/fetchData";

const TeamInfo = ({ teamId, setSelectedTeam }) => {
  const [error, setError] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  console.log("team info");

  useEffect(() => {
    teamId &&
      fetchData("particularTeam", teamId).then(
        (result) => {
          console.log(result);
          setTeamInfo(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [teamId]);

  return (
    <>
      <section className={teamInfo ? "teamInfo teamInfo--active" : "teamInfo"}>
        {teamInfo ? <Team /> : null}
      </section>
    </>
  );

  function Team() {
    const {
      activeCompetitions,
      address,
      area,
      crestUrl,
      email,
      founded,
      name,
      phone,
      shortName,
      venue,
      website,
    } = teamInfo;

    let { squad } = teamInfo;

    const goalkeepers = [],
      defenders = [],
      midfielders = [],
      attackers = [];
    let coach;

    squad.forEach((player) => {
      if (player.role === "COACH") {
        coach = player;
      }
      switch (player.position) {
        case "Goalkeeper":
          goalkeepers.push(player);
          break;
        case "Defender":
          defenders.push(player);
          break;
        case "Midfielder":
          midfielders.push(player);
          break;
        case "Attacker":
          attackers.push(player);
          break;
      }
    });

    squad = [
      {
        position: "goalkeepers",
        players: goalkeepers,
      },
      {
        position: "defenders",
        players: defenders,
      },
      {
        position: "midfielders",
        players: midfielders,
      },
      {
        position: "attackers",
        players: attackers,
      },
    ];

    return (
      <>
        <button
          className="teamInfo__collapse"
          onClick={() => {
            setSelectedTeam(null);
            setTeamInfo(null);
          }}
        >
          <TextWithIcon
            textContent="Back"
            pathData={["M10 19l-7-7m0 0l7-7m-7 7h18"]}
          />
        </button>
        <div className="teamInfo__cover"></div>
        <div
          className="teamInfo__logo"
          style={{ backgroundImage: `url(${crestUrl})` }}
        ></div>
        <h1 className="teamInfo__name">{name}</h1>
        <div className="details">
          <div className="general">
            <h2>General Info.</h2>
            <div className="general__content">
              <div className="general__info">
                <div className="general__country">
                  <h4>Country</h4>
                  <em>{area.name}</em>
                </div>
                <div className="general__activeCompetitions">
                  <h4>Active Competitions</h4>
                  {activeCompetitions.map((competition) => {
                    return <em key={competition.id}>{competition.name}</em>;
                  })}
                </div>
                <div className="general__stadium">
                  <h4>Stadium</h4>
                  <TextWithIcon
                    textContent={venue}
                    pathData={[
                      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                      "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                    ]}
                  />
                </div>
                <div className="general__contact">
                  <h4>Contact</h4>
                  <address>{address}</address>
                  <span className="general__email">
                    {email ? (
                      <a href={`mailto:${email}`}>
                        <TextWithIcon
                          textContent={email}
                          pathData={[
                            "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",
                          ]}
                        />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </span>
                  <span className="general__website">
                    {website ? (
                      <a href={website} target="_blank" rel="noreferrer">
                        <TextWithIcon
                          textContent={website}
                          pathData={[
                            "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
                          ]}
                        />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </div>
              </div>
              <div className="general__form">
                <div className="match">
                  <h5>Penultimate Match</h5>
                  <div className="match__score">
                    <div className="match__home">
                      <h3 className="match__name">fetching...</h3>
                      <em className="match__goals"></em>
                    </div>
                    <div className="match__away">
                      <em className="match__goals"></em>
                      <h3 className="match__name">fetching...</h3>
                    </div>
                  </div>
                </div>

                <div className="match">
                  <h5>Last Match</h5>
                  <div className="match__score">
                    <div className="match__home">
                      <h3 className="match__name">fetching...</h3>
                      <em className="match__goals"></em>
                    </div>
                    <div className="match__away">
                      <em className="match__goals"></em>
                      <h3 className="match__name">fetching...</h3>
                    </div>
                  </div>
                </div>

                <div className="match">
                  <h5>Next Match</h5>
                  <div className="match__score">
                    <div className="match__home">
                      <h3 className="match__name">fetching...</h3>
                    </div>
                    <em>v/s</em>
                    <div className="match__away">
                      <h3 className="match__name">fetching...</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="teamSquad">
            <h2>Squad</h2>
            <div className="manager">
              <h3>Manager</h3>
              <div className="player">
                <h4 className="player__name">{coach.name}</h4>
                <em className="player__nationality">{coach.nationality}</em>
                <small className="player__age">
                  {new Date().getFullYear() -
                    new Date(coach.dateOfBirth).getFullYear()}{" "}
                  yrs
                </small>
              </div>
            </div>
            <div className="squad">
              {squad.map((s) => {
                return (
                  <div
                    key={`squad__${s.position}`}
                    className={`squad__${s.position}`}
                  >
                    <h3>{s.position}</h3>
                    <div className="players">
                      {s.players.map((player) => {
                        return (
                          <div key={player.id} className="player">
                            <h4 className="player__name">{player.name}</h4>
                            <em className="player__nationality">
                              {player.nationality}
                            </em>
                            <small className="player__age">
                              {new Date().getFullYear() -
                                new Date(player.dateOfBirth).getFullYear()}{" "}
                              yrs
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TeamInfo;
