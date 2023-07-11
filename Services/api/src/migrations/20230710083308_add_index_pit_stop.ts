import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pit_stop", (table) => {
    table.index("driver_rank_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pit_stop", (table) => {
    table.dropIndex("driver_rank_id");
  });
}
