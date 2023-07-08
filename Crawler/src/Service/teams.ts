import { Team } from "../types/Team";
import { findByTeam, create } from "../Repos/teams";

export const createNew = async (team: Team) => {
  const teamAlreadyExists = await findByTeam(team);
  if (!teamAlreadyExists) {
    const newTeam = await create(team);
    return newTeam;
  }
  return teamAlreadyExists;
};
