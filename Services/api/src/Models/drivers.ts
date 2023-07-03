import { Model } from "objection";

export class drivers extends Model {
  static get tableName() {
    return "drivers";
  }

  static get relationMappings() {
    return {
      history_working: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/teams`,
        join: {
          from: "drivers.id",
          through: {
            from: "career_history.driver_id",
            to: "career_history.team_id",
          },
          to: "teams.id",
        },
      },
    };
  }
}
