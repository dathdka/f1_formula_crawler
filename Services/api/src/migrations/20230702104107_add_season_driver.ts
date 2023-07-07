import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("season_driver", (table) => {
    table.increments("id").primary();
    table
      .integer("season_id")
      .references("id")
      .inTable("seasons")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("driver_id")
      .references("id")
      .inTable("drivers")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table
      .integer("car_id")
      .references("id")
      .inTable("cars")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table.integer("number");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("season_driver");
}
