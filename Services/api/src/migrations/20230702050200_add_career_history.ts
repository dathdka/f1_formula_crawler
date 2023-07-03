import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('career_history', (table) => {
        table.increments('id').primary();
        table.integer('driver_id').references('id').inTable('drivers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.integer('team_id').references('id').inTable('teams')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('career_history');
}

