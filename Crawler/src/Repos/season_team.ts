import { season_team } from "../Models/season_team";
import { SeasonTeam } from "../types/SeasonTeam";

export const findBySeasonTeam = async (seasonTeam: SeasonTeam) =>
  (
    await season_team
      .query()
      .findOne(seasonTeam)
      .withGraphFetched("[season, team]")
  )?.toJSON();

export const create = async (seasonTeam: SeasonTeam) =>
  (
    await season_team
      .query()
      .insert(seasonTeam)
      .withGraphFetched("[season, team]")
  ).toJSON();

