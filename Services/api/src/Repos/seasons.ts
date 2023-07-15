import { Season } from "../types/Model/Season";
import { seasons } from "../Models/seasons";
import { season_driver } from "../Models/season_driver";
import { Condition } from "../types/conditions/Condition";
export const all = async (
  conditions: Condition[],
  page: number,
  limit: number
) => {
  let builder = seasons
    .query()
    .withGraphFetched("[drivers, races, teams]")
    .page(page, limit);
  builder.modifyGraph("races", (modify) => modify.select("races.id", "date"));
  builder.leftJoin("season_driver", "seasons.id", "season_driver.season_id");
  builder.leftJoin("drivers", "season_driver.driver_id", "drivers.id");
  builder.leftJoin("cars", "season_driver.car_id", "cars.id");
  builder.leftJoin("driver_rank", "season_driver.id", "driver_rank.driver_id");
  builder.leftJoin("season_race", "seasons.id", "season_race.season_id");
  builder.leftJoin("races", "season_race.race_id", "races.id");
  builder.leftJoin("circuits", "races.races_info", "circuits.id");
  builder.leftJoin("season_team", "seasons.id", "season_team.season_id");
  builder.leftJoin("teams", "season_team.team_id", "teams.id");
  builder.leftJoin("qualifying", "driver_rank.qualifying_id", "qualifying.id");
  builder.leftJoin(
    "fastest_lap",
    "driver_rank.fastest_lap_id",
    "fastest_lap.id"
  );
  builder.leftJoin("pit_stop", "driver_rank.id", "pit_stop.driver_rank_id");
  for (let condition of conditions) {
    builder.where(condition.columnName, condition.operator, condition.value);
  }
  builder.groupBy("seasons.id");
  builder.orderBy("seasons.name", "DESC");
  return builder;
};

export const champion = async (seasonName: string) => {
  let builder = season_driver.query().withGraphFetched("[driver, season]");
  builder.leftJoin("driver_rank", "season_driver.id", "driver_rank.driver_id");
  builder.leftJoin("seasons", "season_driver.season_id", "seasons.id");
  builder.select("season_driver.id");
  builder.sum("driver_rank.points as points");
  builder.where("seasons.name", seasonName);
  builder.groupBy("season_driver.id");
  builder.orderBy("season_driver.id");
  builder.limit(1);
  return builder;
};
