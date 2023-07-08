import { drivers } from "../Models/drivers";
import { Driver } from "../types/Driver";

export const findByNameAndNationaly = async (driver: Driver) =>
  (
    await drivers
      .query()
      .findOne({ name: driver.name, nationality: driver.nationality })
      .withGraphFetched("[participation_history]")
  )?.toJSON();

export const create = async (driver: Driver) =>
  (
    await drivers
      .query()
      .insert(driver)
      .withGraphFetched("[participation_history]")
  ).toJSON();

export const update = async (driver: Driver) =>
  (
    await drivers
      .query()
      .patchAndFetchById(+`${driver.id}`, driver)
      .withGraphFetched("[participation_history]")
  ).toJSON();
