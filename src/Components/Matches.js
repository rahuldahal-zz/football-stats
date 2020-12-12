import React, {useEffect, useState} from "react";
import LeagueDetails from "../utils/leagueDetails";
import {fetchData} from "../utils/fetchData";

const leagueDetails = new LeagueDetails();

const Matches = ({ league }) => {
  const leagueId = leagueDetails.getId(league);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matches, setMatches] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  useEffect(() => {
    fetchData("matches", leagueId, {matchday: 6})
      .then((result) => {
        console.log(result);
          setIsLoaded(true);
          setMatches(result.matches);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [leagueId])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="matches">
        {matches.map(match=>{
              const {homeTeam, awayTeam, utcDate} = match;
              const date = new Date(utcDate);

              return (
                <div key={match.id} className="match">
                  <div className="team">
                    <div className="team__home">
                      <img src={homeTeam.crestUrl} alt={`${homeTeam.name}logo`} className="team__logo" />
                      <h3 className="team__name">{homeTeam.name}</h3>
                    </div>
                    <strong>v/s</strong>
                    <div className="awayTeam">
                      <img src={awayTeam.crestUrl} alt={`${awayTeam.name}logo`} className="team__logo" />
                      <h3 className="team__name" >{awayTeam.name}</h3>
                    </div>
                  </div>
                  <small className="match__date">{date.toLocaleString()}</small>
                </div>
              )
        })}
      </div>
    );
  }
}


export default Matches;
