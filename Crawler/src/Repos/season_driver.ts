import { season_driver } from "../Models/season_driver";
import { SeasonDriver } from "../types/SeasonDriver";

export const findBySeasonDriver = async (seasonDriver: SeasonDriver) =>
  (await season_driver.query().findOne(seasonDriver))?.toJSON();

export const create = async (seasonDriver: SeasonDriver) =>
  (await season_driver.query().insert(seasonDriver)).toJSON();
