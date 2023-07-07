import { Model } from "objection";

export class rank extends Model {
  static get tableName() {
    return "driver_rank";
  }

  static get relationMappings() {
    return {
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/season_driver`,
        join: {
          from: "driver_rank.driver_id",
          to: "season_driver.id",
        },
      },
      race: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/season_race`,
        join: {
          from: "driver_rank.race_id",
          to: "season_race.id",
        },
      },
      pit_stop: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/pit_stop`,
        join: {
          from: "driver_rank.pit_stop_id",
          to: "pit_stop.id",
        },
      },
      qualifying: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/qualifying`,
        join: {
          from: "driver_rank.qualifying_id",
          to: "qualifying.id",
        },
      },
      fastest_lap: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/fastest_lap`,
        join: {
          from: "driver_rank.fastest_lap_id",
          to: "fastest_lap.id",
        },
      },
    };
  }
}
