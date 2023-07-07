import { SeasonDriver } from "../types/SeasonDriver";
import { findBySeasonDriver, create, update } from "../Repos/season_driver";

export const createNew = async (seasonDriver: SeasonDriver) => {
  const seasonDriverAlreadyExists = await findBySeasonDriver(seasonDriver);
  if (!seasonDriverAlreadyExists) {
    return await create(seasonDriver);
  }
  return seasonDriverAlreadyExists;
};

export const updateData = async (seasonDriver: SeasonDriver) => {
  return await update(seasonDriver);
}