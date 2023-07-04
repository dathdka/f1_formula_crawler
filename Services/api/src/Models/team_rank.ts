import { Model } from "objection";

export class team_rank extends Model {
  static get tableName() {
    return "team_rank";
  }

  static get relationMappings() {
    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/season_team`,
        join: {
          from: "team_rank.team_id",
          to: "season_team.id",
        },
      },
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/season_race`,
        join: {
          from: "season_team.race_id",
          to: "season_race.id",
        },
      },
    };
  }
}
