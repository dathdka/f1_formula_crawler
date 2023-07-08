import { Car } from "../types/Car";
import { findByCar, create } from "../Repos/cars";

export const createNew = async (car: Car) => {
  const carAlreadyExists = await findByCar(car);
  if (!carAlreadyExists) {
    const newCar = await create(car);
    return newCar;
  }
  return carAlreadyExists;
};
