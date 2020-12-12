const onlineEndpoints = (id, params) => {
  return {
    leagueDetails: `https://api.football-data.org/v2/competitions/${id}`,
    standings: `https://api.football-data.org/v2/competitions/${id}/standings`,
    teams: `https://api.football-data.org/v2/competitions/${id}/teams`,
    particularTeam: `https://api.football-data.org/v2/teams/${id}`,
    scorers: `https://api.football-data.org/v2/competitions/${id}/scorers`,
    matches: `https://api.football-data.org/v2/competitions/${id}/matches/?${params}`,
  };
};

export function fetchData(dataToBeFetched, id, params) {
  params = new URLSearchParams(params).toString();
  const {
    leagueDetails,
    standings,
    teams,
    particularTeam,
    matches,
    scorers,
  } = onlineEndpoints(id, params);

  return new Promise((resolve, reject) => {
    let url;

    if (!dataToBeFetched) {
      url = leagueDetails;
    }

    if (dataToBeFetched === "standings") {
      url = standings;
    }

    if (dataToBeFetched === "teams") {
      url = teams;
    }

    if (dataToBeFetched === "particularTeam") {
      url = particularTeam;
    }

    if (dataToBeFetched === "matches") {
      url = matches;
    }

    if (dataToBeFetched === "scorers") {
      url = scorers;
    }

    let myHeaders = new Headers({
      "X-Auth-Token": "81e1d8497a114fccac5688e87f6741a0",
    });
    fetch(url, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
