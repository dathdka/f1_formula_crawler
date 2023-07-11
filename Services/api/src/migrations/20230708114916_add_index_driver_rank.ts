import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('driver_rank', (table) => {
        table.index('driver_id');
        table.index('race_id');
        table.index('fastest_lap_id');
        table.index('qualifying_id');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('driver_rank', (table)=> {
        table.dropIndex('driver_id');
        table.dropIndex('race_id');
        table.dropIndex('fastest_lap_id');
        table.dropIndex('qualifying_id');
    })
}

