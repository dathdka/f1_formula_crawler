import type { Knex } from "knex";

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      port: +`${process.env.DB_PORT}`,
      host: process.env.DB_HOST,
    },
  },
};


