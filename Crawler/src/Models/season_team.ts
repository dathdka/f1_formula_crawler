import { Model } from "objection";

export class season_team extends Model {
  static get tableName() {
    return "season_team";
  }

  static get relationMappings() {
    return {
      rank: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/team_rank`,
        join: {
          from: "season_team.id",
          to: "team_rank.team_id",
        },
      },
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
      },
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/cars`,
        join: {
          from : 'season_team.car_id',
          to : 'cars.id'
        }
      }
    };
  }
}
