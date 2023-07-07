import { fastest_lap } from "../Models/fastest_lap";
import { FastestLap } from "../types/FastestLap";

export const findByFastestLap = async (fastestLap: FastestLap) =>
  (
    await fastest_lap
      .query()
      .findOne(fastestLap)
      .withGraphFetched("[rank]")
  )?.toJSON();

export const create = async  (fastestLap: FastestLap) =>
  (
    await fastest_lap
      .query()
      .insert(fastestLap)
      .withGraphFetched("[rank]")
  ).toJSON();
