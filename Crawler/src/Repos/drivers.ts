import { drivers } from "../Models/drivers";
import { Driver } from "../types/Driver";

export const findByNameAndNationaly = async (driver: Driver) =>
  (
    await drivers
      .query()
      .findOne({ name: driver.name, nationality: driver.nationality })
  )?.toJSON();

export const create = async (driver: Driver) =>
  (await drivers.query().insert(driver).returning("*")).toJSON();
