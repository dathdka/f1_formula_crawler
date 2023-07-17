import { cars } from "../Models/cars";
import { Condition } from "../types/conditions/Condition";

export const all = async (
  conditions: Condition[],
  page: number,
  limit: number
) => {
  const builder = cars.query().withGraphFetched("[drivers]").page(page, limit);
  builder.leftJoin("season_driver", "cars.id", "season_driver.car_id");
  builder.leftJoin("seasons", "season_driver.season_id", "seasons.id");
  builder.leftJoin("drivers", "season_driver.driver_id", "drivers.id");
  builder.leftJoin("driver_rank", "season_driver.id", "driver_rank.driver_id");
  for (let condition of conditions) {
    builder.where(condition.columnName, condition.operator, condition.value);
  }
  return builder;
};

export const getDriversByCarName = async ( carName: string ) => {
  const builder = cars.query().withGraphFetched("[drivers]");
  builder.where("cars.name","LIKE" ,`%${carName}%`);
  return builder;
}