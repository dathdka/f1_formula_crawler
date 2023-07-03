import { Model } from "objection";

export class pit_stop extends Model {
  static get tableName() {
    return "pit_stop";
  }

  static get relationMappings() {
    return {
      rank: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/rank`,
        join: {
          from: "pit_stop.id",
          to: "rank.pit_stop_id",
        },
      },
    };
  }
}
