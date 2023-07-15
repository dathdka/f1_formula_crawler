import { Model } from "objection";

export class drivers extends Model {
  static get tableName() {
    return "drivers";
  }

  static get relationMappings() {
    return {
      participation_history: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "drivers.id",
          through: {
            from: "season_driver.driver_id",
            to: "season_driver.season_id",
          },
          to: "seasons.id",
        },
      },
      rank: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/driver_rank`,
        join: {
          from : "drivers.id",
          through: {
            from : "season_driver.driver_id",
            to : "season_driver.id"
          },
          to: "driver_rank.driver_id"
        }
      }
    };
  }
}
