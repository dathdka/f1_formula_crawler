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
            to: "season_driver.team_id",
          },
          to: "seasons.id",
        },
      },
    };
  }
}
