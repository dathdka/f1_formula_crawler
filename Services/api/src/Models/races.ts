import { Model } from "objection";

export class races extends Model {
  static get tableName() {
    return "races";
  }

  static get relationMappings() {
    return {
      info: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/circuits`,
        join: {
          from: "races.races_info",
          to: "circuits.id",
        },
      },
      seasons: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "races.id",
          through: {
            from: "season_race.race_id",
            to: "season_race.season_id",
          },
          to: "seasons.id",
        },
      },
    };
  }
}
