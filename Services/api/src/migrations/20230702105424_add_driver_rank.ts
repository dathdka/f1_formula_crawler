import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("driver_rank", (table) => {
    table
      .integer("driver_id")
      .references("id")
      .inTable("season_driver")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("race_id")
      .references("id")
      .inTable("season_race")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table.integer("postion");
    table.integer("points");
    table.integer("completed_laps");
    table.string("finish_time");
    table.integer("start_position");
    table.primary(["driver_id", "race_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("driver_rank");
}
