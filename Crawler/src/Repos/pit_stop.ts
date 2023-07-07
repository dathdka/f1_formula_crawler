import { pit_stop } from "../Models/pit_stop";
import { PitStop } from "../types/PitStop";

export const findByPitStop = async (pitStop: PitStop) =>
  (
    await pit_stop.query().findOne(pitStop).withGraphFetched("[rank]")
  )?.toJSON();

export const create = async (pitStop: PitStop) =>
  (await pit_stop.query().insert(pitStop).withGraphFetched("[rank]")).toJSON();
