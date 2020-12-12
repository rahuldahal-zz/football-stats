// var UCL = "#0e1e5b";

const leagueIdAndNameMap = {
  bundesliga: {
    id: 2002,
    hexColor: "#d20515",
    accentColor: "#ffffff",
    rgbColor: "210, 5, 21",
  },
  laliga: {
    id: 2014,
    hexColor: "#ee8707",
    accentColor: "#fbec21",
    rgbColor: "238, 135, 7",
  },
  ligueone: {
    id: 2015,
    hexColor: "#dae025",
    accentColor: "#12233f",
    rgbColor: "218, 224, 37",
  },
  seriea: {
    id: "2019",
    hexColor: "#008fd7",
    accentColor: "#024494",
    rgbColor: "0, 143, 215",
  },
  premierleague: {
    id: "2021",
    hexColor: "#3d195b",
    accentColor: "#e90052",
    rgbColor: "61, 25, 91",
  },
};

export default class LeagueDetails {
  constructor() {}

  getOne(id) {
    return leagueIdAndNameMap[id];
  }

  getId(name) {
    return leagueIdAndNameMap[name].id;
  }

  getHexColor(id) {
    return leagueIdAndNameMap[id].hexColor;
  }

  getRGBColor(id) {
    return leagueIdAndNameMap[id].rgbColor;
  }

  getAccentColor(id) {
    return leagueIdAndNameMap[id].accentColor;
  }
}
