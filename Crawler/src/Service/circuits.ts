import { Circuit } from "../types/Circuit";
import { create, findByName } from "../Repos/circuits";

export const createNew = async (circuit: Circuit) => {
  const circuitAlreadyExists = await findByName(circuit.name);
  if (!circuitAlreadyExists) {
    const newCircuit = await create(circuit);
    return newCircuit;
  }
  return circuitAlreadyExists;
};
