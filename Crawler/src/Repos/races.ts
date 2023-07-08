import { races } from "../Models/races";
import { Race } from "../types/Race";

export const findByDate = async (date: string) =>
  (
    await races
      .query()
      .findOne({ date: date })
      .withGraphFetched("[info, seasons]")
  )?.toJSON();

export const create = async (race: Race) =>
  (
    await races.query().insert(race).withGraphFetched("[info, seasons]")
  ).toJSON();
