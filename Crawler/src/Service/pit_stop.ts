import { PitStop } from "../types/PitStop";
import { findByPitStop, create } from "../Repos/pit_stop";

export const createNew = async (pitStop: PitStop) => {
  const pitStopAlreadyExists = await findByPitStop(pitStop);
  if (!pitStopAlreadyExists) {
    return await create(pitStop);
  }
  return pitStopAlreadyExists;
};
