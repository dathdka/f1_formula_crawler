import { Race } from "../types/Race";
import { findByDate, create } from "../Repos/races";

export const createNew = async (race: Race) => {
  const raceAlreadyExists = await findByDate(race.date);
  if (!raceAlreadyExists) {
    const newRace = await create(race);
    return newRace;
  }
  return raceAlreadyExists;
};
