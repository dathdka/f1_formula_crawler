import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("team_rank", (table) => {
    table
      .integer("team_id")
      .references("id")
      .inTable("season_team")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("race_id")
      .references("id")
      .inTable("season_race")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table.integer("points");
    table.primary(["team_id", "race_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('team_rank')
}
