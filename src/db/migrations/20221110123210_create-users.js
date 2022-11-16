const { DB_USER_TITLE } = require("../../utils/constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(DB_USER_TITLE, (table) => {
    table.increments("id");
    table.string("login").notNullable();
    table.string("name").notNullable();
    table.string("last_name").notNullable();
    table.string("role").notNullable();
    table.string("password").notNullable();
    table.string("department").notNullable();
    table.string("position").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(DB_USER_TITLE);
};
