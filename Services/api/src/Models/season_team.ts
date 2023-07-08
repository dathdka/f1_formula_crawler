import { Model } from "objection";

export class season_team extends Model {
  static get tableName() {
    return "season_team";
  }

  static get relationMappings() {
    return {
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "season_team.season_id",
          to: "seasons.id",
        },
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/teams`,
        join: {
          from: "season_team.season_id",
          to: "teams.id",
        },
      }
    };
  }
}
