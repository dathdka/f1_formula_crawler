import { Driver } from "../types/Driver";
import { findByNameAndNationaly, create, update } from "../Repos/drivers";

export const createNew = async (driver: Driver) => {
  const driverAlreadyExists = await findByNameAndNationaly(driver);
  if (!driverAlreadyExists) {
    const newDriver = await create(driver);
    return newDriver;
  }
  return driverAlreadyExists;
};

export const updateData = async (driver: Driver) => await update(driver);
