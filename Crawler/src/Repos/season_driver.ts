import { season_driver } from "../Models/season_driver";
import { SeasonDriver } from "../types/SeasonDriver";

export const findBySeasonDriver = async (seasonDriver: SeasonDriver) =>
  (
    await season_driver
      .query()
      .findOne(seasonDriver)
      .withGraphFetched("[season, driver]")
  )?.toJSON();

export const create = async (seasonDriver: SeasonDriver) =>
  (
    await season_driver
      .query()
      .insert(seasonDriver)
      .withGraphFetched("[season, driver, car, rank]")
  ).toJSON();

export const update = async (seasonDriver: SeasonDriver) => {
  (
    await season_driver
      .query()
      .patchAndFetchById(+`${seasonDriver.id}`, seasonDriver)
      .withGraphFetched("[season, driver, car, rank]")
  ).toJSON();
};
