import { teams } from "../Models/teams";
import { Team } from "../types/Team";

export const findByTeam = async (team: Team) =>
  (
    await teams
      .query()
      .findOne(team)
      .returning("*")
      .withGraphFetched("[participation_history]")
  )?.toJSON();

export const create = async (team: Team) =>
  (
    await teams
      .query()
      .insert(team)
      .returning("*")
      .withGraphFetched("[participation_history]")
  ).toJSON();
