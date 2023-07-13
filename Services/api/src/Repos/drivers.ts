import { drivers } from "../Models/drivers";
import { seasons } from "../Models/seasons";
import { cars } from "../Models/cars";
import { driver_rank } from "../Models/driver_rank";
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
  builder.modifyGraph("rank", (modify) =>
    modify.select(
      "driver_rank.id",
      "position",
      "start_position",
      "points",
      "completed_laps",
      "finish_time",
    )
  );
  builder.modifyGraph("participation_history", (modify) => modify.select("name"))
  builder.join("season_driver", "drivers.id", "season_driver.driver_id");
  builder.join("driver_rank", "season_driver.id", "driver_rank.driver_id");
  builder.join("season_race", "driver_rank.race_id", "season_race.id");
  builder.join("races", "season_race.race_id", "races.id");
  builder.join("circuits", "races.races_info", "circuits.id");
  builder.join("seasons", "season_driver.season_id", "seasons.id");
  builder.join("qualifying", "driver_rank.qualifying_id", "qualifying.id");
  builder.join("fastest_lap", "driver_rank.fastest_lap_id", "fastest_lap.id");
  builder.join("pit_stop", "driver_rank.id", "pit_stop.driver_rank_id");
  for (let condition of conditions) {
    builder.where(condition.columnName, condition.operator, condition.value);
  }
  return builder;
};

export const getDriverCareerById = async (driverId: number) => {
  let builder = driver_rank
    .query()
    .withGraphFetched(
      "[season_driver.[season, driver, car], season_race.race.info, pit_stop, qualifying, fastest_laps]"
    );
  builder.modifyGraph("season_driver", (modify) => modify.select("id"));
  builder.modifyGraph("season_driver.season", (modify) =>
    modify.select("name")
  );
  builder.modifyGraph("season_driver.car", (modify) => modify.select("name"));
  builder.modifyGraph("season_driver.driver", (modify) =>
    modify.select("name", "nationality")
  );
  builder.modifyGraph("season_race", (modify) => modify.select("id"));
  builder.modifyGraph("season_race.race", (modify) =>
    modify.select("id", "date")
  );
  builder.modifyGraph("pit_stop", (modify) =>
    modify.select("id", "number_of_stops", "time_of_day", "time", "total_time")
  );
  builder.join("season_driver", "driver_rank.driver_id", "season_driver.id");
  builder.join("drivers", "season_driver.driver_id", "drivers.id");
  builder.join("seasons", "season_driver.season_id", "seasons.id");
  builder.where("drivers.id", driverId);
  builder.groupBy("seasons.name", "driver_rank.id");
  builder.orderBy("seasons.name", "DESC");
  builder.select("driver_rank.id", "position", "start_position", "points");
  return builder;
};

export const getById = async (driverId: number) =>
  await drivers
    .query()
    .findById(driverId)
    .withGraphFetched("[participation_history.races.info,rank]");

export const getSeasonsById = async (driverId: number) => {
  let builder = seasons.query();
  builder.join("season_driver", "seasons.id", "season_driver.season_id");
  builder.join("drivers", "season_driver.driver_id", "drivers.id");
  builder.where("drivers.id", driverId);
  builder.groupBy("seasons.id");
  return builder;
};

export const getCarsById = async (driverId: number) => {
  let builder = cars.query();
  builder.join("season_driver", "cars.id", "season_driver.car_id");
  builder.join("drivers", "season_driver.driver_id", "drivers.id");
  builder.where("drivers.id", driverId);
  builder.groupBy("cars.id");
  return builder;
};
