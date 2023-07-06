import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("fastest_lap", (table) => {
    table.increments("id").primary();
    table.string("time");
    table.string("time_of_day");
    table.integer("fastest_lap");
    table.float("average_speed");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("fastest_lap");
}
