import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("qualifying", (table) => {
    table.increments("id").primary();
    table.timestamp("q1");
    table.timestamp("q2");
    table.timestamp("q3");
    table.integer("laps");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("qualifying");
}
