import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("circuits", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("location");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("circuits");
}
