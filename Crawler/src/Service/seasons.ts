import { findByName, create } from "../Repos/seasons";

export const createNew = async (season: string) => {
  const seasonAlreadyExists = await findByName(season);
  if (!seasonAlreadyExists) {
    const newSeason = await create(season);
    return newSeason;
  }
  return seasonAlreadyExists;
};

export const findSeasonByName = async (season: string) => await findByName(season)