import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("races", (table) => {
    table.increments("id").primary();
    table.timestamp("date");
    table
      .integer("races_info")
      .references("id")
      .inTable("circuits")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("races");
}
