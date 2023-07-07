import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("team_rank", (table) => {
    table.increments('id').primary();
    table
      .integer("team_id")
      .references("id")
      .inTable("season_team")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("car_id")
      .references("id")
      .inTable("cars")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table.integer("points");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("team_rank");
}
