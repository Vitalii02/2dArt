// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/.env" });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.KNEX_DIALECT,
    connection: {
      host: process.env.KNEX_HOST,
      port: process.env.KNEX_PORT,
      user: process.env.KNEX_USER,
      password: process.env.KNEX_PASSWORD,
      database: process.env.KNEX_DATABASE,
    },
    migrations: {
      directory: process.env.KNEX_PATH_MIGRATIONS,
    },
    seeds: {
      directory: process.env.KNEX_PATH_SEEDS,
    },
  },
};
