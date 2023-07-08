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
        modelClass: `${__dirname}/drivers`,
        join: {
          from: "season_driver.driver_id",
          to: "drivers.id",
        },
      },
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/cars`,
        join: {
          from: 'season_driver.car_id',
          to: 'cars.id'
        }
      },
      rank: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/driver_rank`,
        join: {
          from: "season_driver.id",
          to: "driver_rank.driver_id",
        },
      },
    };
  }
}
