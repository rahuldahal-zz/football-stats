// var UCL = "#0e1e5b";

const leagueIdAndNameMap = {
  bundesliga: {
    id: 2002,
    fullName: "Bundesliga",
    hexColor: "#d20515",
    accentColor: "#ffffff",
    textColor: "#333333",
    rgbColor: "210, 5, 21",
  },
  laliga: {
    id: 2014,
    fullName: "La Liga",
    hexColor: "#ee8707",
    accentColor: "#fbec21",
    textColor: "#333333",
    rgbColor: "238, 135, 7",
  },
  ligueun: {
    id: 2015,
    fullName: "Ligue 1",
    hexColor: "#dae025",
    accentColor: "#12233f",
    textColor: "#f4f4f4",
    rgbColor: "218, 224, 37",
  },
  seriea: {
    id: "2019",
    fullName: "Serie A",
    hexColor: "#008fd7",
    accentColor: "#024494",
    textColor: "#f4f4f4",
    rgbColor: "0, 143, 215",
  },
  premierleague: {
    id: "2021",
    fullName: "Premier League",
    hexColor: "#3d195b",
    accentColor: "#e90052",
    textColor: "#f4f4f4",
    rgbColor: "61, 25, 91",
  },
};

export default class LeagueDetails {
  constructor() {}

  getOne(name) {
    return leagueIdAndNameMap[name];
  }

  getId(name) {
    return leagueIdAndNameMap[name].id;
  }

  getFullName(name) {
    return leagueIdAndNameMap[name].fullName;
  }

  getHexColor(name) {
    return leagueIdAndNameMap[name].hexColor;
  }

  getRGBColor(name) {
    return leagueIdAndNameMap[name].rgbColor;
  }

  getTextColor(name) {
    return leagueIdAndNameMap[name].textColor;
  }

  getAccentColor(name) {
    return leagueIdAndNameMap[name].accentColor;
  }
}
