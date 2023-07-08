import { circuits } from "../Models/circuits";
import { Circuit } from "../types/Circuit";

export const findByName = async (circuitName: string) =>
  (
    await circuits
      .query()
      .findOne({ name: circuitName })
      .withGraphFetched("[race]")
  )?.toJSON();

export const create = async (circuit: Circuit) =>
  (await circuits.query().insert(circuit).withGraphFetched("[race]")).toJSON();
