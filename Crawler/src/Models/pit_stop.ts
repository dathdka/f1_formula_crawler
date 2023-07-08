import { Model } from "objection";

export class pit_stop extends Model {
  static get tableName() {
    return "pit_stop";
  }

  static get relationMappings() {
    return {
      rank: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/driver_rank`,
        join: {
          from: "pit_stop.driver_rank_id",
          to: "driver_rank.id",
        },
      },
    };
  }
}
