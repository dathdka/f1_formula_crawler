import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("driver_rank", (table) => {
    table
      .integer("fastest_lap_id")
      .references("id")
      .inTable("fastest_lap")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("qualifying_id")
      .references("id")
      .inTable("qualifying")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("driver_rank", (table) => {
    table.dropColumn("fastest_lap_id");
    table.dropColumn("pit_stop_id");
    table.dropColumn("qualifying_id");
  });
}
