import { Model } from "objection";

export class seasons extends Model {
  static get tableName() {
    return "seasons";
  }

  static get relationMappings() {
    return {
      drivers: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/career_history`,
        join: {
          from: "seasons.id",
          through: {
            from: "season_driver.season_id",
            to: "season_driver.driver_id",
          },
          to: "career_history.id",
        },
      },
      races: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/races`,
        join: {
          from: "seasons.id",
          through: {
            from: "season_race.season_id",
            to: "season_race.race_id",
          },
          to: "races.id",
        },
      },
    };
  }
}
