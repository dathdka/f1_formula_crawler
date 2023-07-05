import { SeasonDriver } from "../types/SeasonDriver";
import { findBySeasonDriver, create } from "../Repos/season_driver";

export const createNew = async (seasonDriver: SeasonDriver) => {
  const seasonDriverAlreadyExists = await findBySeasonDriver(seasonDriver);
  if (!seasonDriverAlreadyExists) {
    return await create(seasonDriver);
  }
  return seasonDriverAlreadyExists;
};
