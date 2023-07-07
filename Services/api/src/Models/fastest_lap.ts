import { Model } from "objection";

export class fastest_lap extends Model {
  static get tableName() {
    return "fastest_lap";
  }

  static get relationMappings() {
    return {
      rank: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/driver_rank`,
        join: {
          from: "fastest_lap.id",
          to: "driver_rank.fastest_lap_id",
        },
      },
    };
  }
}
