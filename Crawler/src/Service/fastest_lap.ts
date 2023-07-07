import { FastestLap } from "../types/FastestLap";
import { findByFastestLap, create } from "../Repos/fastest_lap";

export const createNew = async (fastestLap: FastestLap) => {
  const fastestLapAlreadyExists = await findByFastestLap(fastestLap);  
  if (!fastestLapAlreadyExists) {
    return await create(fastestLap);
  }
  return fastestLapAlreadyExists;
};
