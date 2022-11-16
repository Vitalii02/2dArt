const environment = "development";
const config = require("../../knexfile");
const environmentConfig = config[environment];
const knex = require("knex");
const db = knex(environmentConfig);

module.exports = db;
