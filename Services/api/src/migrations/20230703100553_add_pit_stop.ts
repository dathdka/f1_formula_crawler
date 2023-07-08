import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pit_stop", (table) => {
    table.increments("id").primary();
    table.integer("number_of_stops");
    table.string("time_of_day");
    table.string("time");
    table.string("total_time");
    table
    .integer("driver_rank_id")
    .references("id")
    .inTable("driver_rank")
    .onUpdate("CASCADE")
    .onDelete("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pit_stop");
}
