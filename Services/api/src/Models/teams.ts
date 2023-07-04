import { Model } from "objection";

export class teams extends Model {
  static get tableName(): string {
    return "teams";
  }

  static get relationMappings() {
    return {
      participation_history: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "teams.id",
          through: {
            from: "season_team.team_id",
            to: "season_team.season_id",
          },
          to: "seasons.id",
        },
      },
    };
  }
}
