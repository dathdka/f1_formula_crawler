import { Driver } from "../types/Model/Driver";
import { drivers } from "../Models/drivers";
import { Condition } from "../types/conditions/Condition";

export const all = async (
  conditions: Condition[],
  page: number,
  limit: number
) => {
  let builder = drivers
    .query()
    .withGraphFetched("[participation_history, rank]")
    .page(page, limit);
  builder.join("season_driver", "drivers.id", "season_driver.driver_id");
  builder.join("driver_rank", "season_driver.id", "driver_rank.driver_id");
  builder.join("season_race", "driver_rank.race_id", "season_race.id");
  builder.join("races", "season_race.race_id", "races.id");
  builder.join("circuits", "races.races_info", "circuits.id");
  builder.join("seasons", "season_driver.season_id", "seasons.id");
  for (let condition of conditions) {
    builder.where(condition.columnName, condition.operator, condition.value);
  }
  return builder;
};

export const getById = async (driverId: string) =>
  await drivers
    .query()
    .findById(driverId)
    .withGraphFetched("[participation_history.races.info,rank]");
