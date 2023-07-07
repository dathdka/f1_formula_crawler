require("dotenv").config({ path: `${__dirname}/../.env` });


module.exports = {
  development: {
    client: `pg`,
    connection: {
      database: process.env.DB_NAME,
      user: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      port: +`${process.env.DB_PORT}`,
      host: process.env.DB_HOST,
    },
  },
};
