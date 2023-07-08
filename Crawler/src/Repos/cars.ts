import { cars } from "../Models/cars";
import { Car } from "../types/Car";

export const findByCar = async (car: Car) =>
  (
    await cars
      .query()
      .findOne(car)
      .returning("*")
      .withGraphFetched("[season_driver]")
  )?.toJSON();

export const create = async (car: Car) =>
  (
    await cars
      .query()
      .insert(car)
      .returning("*")
      .withGraphFetched("[season_driver]")
  ).toJSON();
