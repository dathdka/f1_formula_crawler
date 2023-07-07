import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("season_team", (table) => {
    table.increments("id").primary();
    table
      .integer("season_id")
      .references("id")
      .inTable("seasons")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("team_id")
      .references("id")
      .inTable("teams")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("season_team");
}
