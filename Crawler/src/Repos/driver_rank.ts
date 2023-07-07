import { driver_rank } from "../Models/driver_rank";
import { DriverRank } from "../types/DriverRank";

export const findByDriverRank = async (driverRank: DriverRank) =>
  (
    await driver_rank
      .query()
      .findOne(driverRank)
      .withGraphFetched("[driver, race, pit_stop, qualifying, fastest_laps]")
  )?.toJSON();

export const create = async (driverRank: DriverRank) =>
  (
    await driver_rank
      .query()
      .insert(driverRank)
      .withGraphFetched("[driver, race, pit_stop, qualifying, fastest_laps]")
  ).toJSON();

export const update = async (driverRank: DriverRank) =>
  (
    await driver_rank
      .query()
      .updateAndFetchById(+`${driverRank.id}`,driverRank)
      .withGraphFetched("[driver, race, pit_stop, qualifying, fastest_laps]")
  )?.toJSON();
