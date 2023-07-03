import { Model } from "objection";

export class season_driver extends Model {
  static get tableName() {
    return "season_driver";
  }

  static get relationMappings() {
    return {
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "season_driver.season_id",
          to: "seasons.id",
        },
      },
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/career_history`,
        join: {
          from: "season_driver.driver_id",
          to: "career_history.id",
        },
      },
      rank: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/rank`,
        join: {
          from: "career_history.id",
          to: "rank.driver_id",
        },
      },
    };
  }
}
