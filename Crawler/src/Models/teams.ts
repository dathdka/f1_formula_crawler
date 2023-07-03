import { Model } from "objection";

export class teams extends Model {
  static get tableName(): string {
    return "teams";
  }

  static get relationMappings() {
    return {
      members: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/drivers`,
        join: {
          from: "teams.id",
          through: {
            from: "career_history.team_id",
            to: "career_history.driver_id",
          },
          to: "drivers.id",
        },
      },
    };
  }
}
