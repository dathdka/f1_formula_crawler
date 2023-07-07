import { Model } from "objection";

export class season_race extends Model {
  static get tableName() {
    return "season_race";
  }

  static get relationMappings() {
    return {
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/seasons`,
        join: {
          from: "season_race.season_id",
          to: "seasons.id",
        },
      },
      race: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/races`,
        join: {
          from: "season_race.race_id",
          to: "races.id",
        },
      },
      driver_rank: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/driver_rank`,
        join: {
          from: "season_race.id",
          to: "driver_rank.race_id",
        },
      },
      team_rank: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/team_rank`,
        join: {
          from: "season_race.id",
          to: "team_rank.race_id",
        },
      },
    };
  }
}
