import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../utils/fetchData";

const TeamInfo = ({ shortNames, teamId }) => {
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
      <section className="teamInfo">{teamInfo ? <Team /> : null}</section>
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
        case null:
          coach = player;
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
        <button className="teamInfo__collapse">
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="teamInfo__cover"></div>
        <div className="teamInfo__logo">
          <img src={crestUrl} alt={`${shortName} logo`} />
        </div>
        <div className="teamInfo__name">{name}</div>
        <div className="info">
          <div className="general">
            <h2>General Info.</h2>
            <div id="info__general">
              <div id="info">
                <div id="country">{area.name}</div>
                <div id="activeCompetitions">
                  <h4>Active Competitions</h4>
                  {activeCompetitions.map((competition) => {
                    return <em key={competition.id}>{competition.name}</em>;
                  })}
                </div>
                <div id="stadium">
                  <h4>Stadium</h4>
                  <p id="stadiumName">{venue}</p>
                </div>
                <div id="contact">
                  <h4>Contact</h4>
                  <address id="address">{address}</address>
                  <a href={`mailto:${email}`} id="email">
                    <i className="fas fa-at"></i>
                    {email}
                  </a>
                  <a
                    href={website}
                    id="website"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    {website}
                  </a>
                </div>
              </div>
              <div id="matches">
                <div id="previousMatch">
                  <h5>Previous Match</h5>
                  <div className="score">
                    <div className="home">
                      <h3 id="previousHomeName">fetching...</h3>
                      <p id="previousHomeGoal"></p>
                    </div>
                    <div className="away">
                      <p id="previousAwayGoal"></p>
                      <h3 id="previousAwayName">fetching...</h3>
                    </div>
                  </div>
                </div>
                <div id="lastMatch">
                  <h5>Last Match</h5>
                  <div className="score">
                    <div className="home">
                      <h3 id="lastHomeName">fetching...</h3>
                      <p id="lastHomeGoal"></p>
                    </div>
                    <div className="away">
                      <p id="lastAwayGoal"></p>
                      <h3 id="lastAwayName">fetching...</h3>
                    </div>
                  </div>
                </div>
                <div id="nextMatch">
                  <h5>Next Match</h5>
                  <div className="score">
                    <div className="home">
                      <h3 id="nextHomeName">fetching...</h3>
                    </div>
                    <em>v/s</em>
                    <div className="away">
                      <h3 id="nextAwayName">fetching...</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="squad">
            <h2>Squad</h2>
            <div id="manager">
              <h3>Manager</h3>
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
                              {player.dateOfBirth}
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
