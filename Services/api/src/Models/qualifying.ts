import { Model } from "objection";

export class qualifying extends Model {
  static get tableName() {
    return "qualifying";
  }

  static get relationMappings() {
    return {
      rank: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/rank`,
        join: {
          from: "qualifying.id",
          to: "rank.qualifying_id",
        },
      },
    };
  }
}
