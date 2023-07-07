import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("qualifying", (table) => {
    table.increments("id").primary();
    table.string("q1");
    table.string("q2");
    table.string("q3");
    table.integer("laps");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("qualifying");
}
