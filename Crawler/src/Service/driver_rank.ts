import { DriverRank } from "../types/DriverRank";
import { findByDriverRank, create } from "../Repos/driver_rank";

export const createNew = async (driverRank: DriverRank) => {
  const seasonRaceAlreadyExists = await findByDriverRank(driverRank);
  if (!seasonRaceAlreadyExists) {
    return await create(driverRank);
  }
  return seasonRaceAlreadyExists;
};
