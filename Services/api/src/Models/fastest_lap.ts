import { Model } from "objection";

export class fastest_lap extends Model {
  static get tableName() {
    return "fastest_lap";
  }

  static get relationMappings() {
    return {
      rank: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/rank`,
        join: {
          from: "fastest_lap.id",
          to: "rank.fastest_lap_id",
        },
      },
    };
  }
}
