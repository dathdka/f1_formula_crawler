import { seasons } from "../Models/seasons";

export const findByName = async (seasonName: string) =>
  (await seasons.query().findOne({ name: seasonName }))?.toJSON();

export const create = async (seasonName: string) =>
  (await seasons.query().insert({ name: seasonName }).returning(["*"])).toJSON();
