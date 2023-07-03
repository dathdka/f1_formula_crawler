import { Model } from "objection";

export class circuits extends Model {
  static get tableName() {
    return "circuits";
  }

  static get relationMappings() {
    return {
      race: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/races`,
        join: {
          from: "circuits.id",
          to: "races.races_info",
        },
      },
    };
  }
}
