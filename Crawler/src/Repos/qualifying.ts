import { qualifying } from "../Models/qualifying";
import { Qualifying } from "../types/Qualifying";

export const findByQualify = async (qualify: Qualifying) =>
  (
    await qualifying
      .query()
      .findOne(qualify)
      .withGraphFetched("[rank]")
  )?.toJSON();

export const create = async (qualify: Qualifying) =>
  (
    await qualifying
      .query()
      .insert(qualify)
      .withGraphFetched("[rank]")
  ).toJSON();
