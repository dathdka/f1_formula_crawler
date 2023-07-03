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
      .inTable("career_history")
      .onUpdate("CASCADE")
      .onDelete("NO ACTION");
    table.string("car");
    table.integer('number')
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("season_driver");
}
