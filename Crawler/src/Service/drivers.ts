import { Driver } from "../types/Driver";
import { findByNameAndNationaly, create } from "../Repos/drivers";

export const createNew = async (driver: Driver) => {
  const driverAlreadyExists = await findByNameAndNationaly(driver);
  if (!driverAlreadyExists) {
    const newDriver = await create(driver);
    return newDriver;
  }
  return driverAlreadyExists;
};
