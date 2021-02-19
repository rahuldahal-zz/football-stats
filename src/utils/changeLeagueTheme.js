import LeagueDetails from "./leagueDetails";

let leagueNameClosure;

export default function changeLeagueTheme(newLeagueName) {
  if (leagueNameClosure !== newLeagueName) {
    leagueNameClosure = newLeagueName;

    const root = document.documentElement;
    root.style.setProperty(
      "--leagueTheme",
      LeagueDetails.prototype.getHexColor(newLeagueName)
    );
    root.style.setProperty(
      "--leagueThemeRGB",
      LeagueDetails.prototype.getRGBColor(newLeagueName)
    );
    root.style.setProperty(
      "--leagueAccent",
      LeagueDetails.prototype.getAccentColor(newLeagueName)
    );
    root.style.setProperty(
      "--leagueText",
      LeagueDetails.prototype.getTextColor(newLeagueName)
    );
  }
}
