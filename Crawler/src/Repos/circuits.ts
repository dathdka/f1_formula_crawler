import { Circuit } from "../types/Circuit";
import { circuits } from "../Models/circuits";

export const findByName = async (circuitName: string) =>
  (await circuits.query().findOne({ name: circuitName }).returning("*"))?.toJSON();

export const create = async (circuit: Circuit) =>
  (await circuits.query().insert(circuit).returning("*")).toJSON();
