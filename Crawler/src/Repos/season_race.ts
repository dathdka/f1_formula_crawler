import { season_race } from "Models/season_race";
import { SeasonRace } from "types/SeasonRace";

export const findBySeasonRace = async (seasonRace: SeasonRace) =>
  (await season_race.query().findOne(seasonRace))?.toJSON();

export const create = async (seasonRace: SeasonRace) =>
  (await season_race.query().insert(seasonRace)).toJSON();
