import { Qualifying } from "../types/Qualifying";
import { findByQualify, create } from "../Repos/qualifying";

export const createNew = async (qualify: Qualifying) => {
  const qualifyAlreadyExists = await findByQualify(qualify);  
  if (!qualifyAlreadyExists) {
    return await create(qualify);
  }
  return qualifyAlreadyExists;
};
