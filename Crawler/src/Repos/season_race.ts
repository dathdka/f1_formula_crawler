import { season_race } from "../Models/season_race";
import { SeasonRace } from "../types/SeasonRace";

export const findBySeasonRace = async (seasonRace: SeasonRace) =>
  (
    await season_race
      .query()
      .findOne(seasonRace)
      .withGraphFetched("[season, race, driver_rank]")
  )?.toJSON();

export const create = async (seasonRace: SeasonRace) =>
  (
    await season_race
      .query()
      .insert(seasonRace)
      .withGraphFetched("[season, race, driver_rank]")
  ).toJSON();
