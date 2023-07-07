import { DriverRank } from "../types/DriverRank";
import { findByDriverRank, create, update } from "../Repos/driver_rank";

export const createNew = async (driverRank: DriverRank) => {
  const driverRankAlreadyExists = await findByDriverRank(driverRank);
  if (!driverRankAlreadyExists) {
    return await create(driverRank);
  }
  return driverRankAlreadyExists;
};

export const updateData = async (driverRank: DriverRank) => {
  return await update(driverRank);
}