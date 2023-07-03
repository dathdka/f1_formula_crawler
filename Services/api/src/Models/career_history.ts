import { Model } from "objection";

export class career_history extends Model {
  static get tableName() {
    return "career_history";
  }

  static get relationMappings() {
    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/teams`,
        join: {
          from: "career_history.team_id",
          to: "teams.id",
        },
      },
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/drivers`,
        join: {
          from: "career_history.driver_id",
          to: "drivers.id",
        },
      },
      seasons: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "career_history.id",
          through: {
            from: "season_driver.driver_id",
            to: "season_driver.season_id",
          },
          to: "seasons.id",
        },
      },
    };
  }
}
