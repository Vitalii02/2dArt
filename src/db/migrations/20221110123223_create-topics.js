const { DB_TOPICS_TITLE } = require("../../utils/constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(DB_TOPICS_TITLE, (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("text").notNullable();
    table.string("description").notNullable();
    table.integer("user_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(DB_TOPICS_TITLE);
};
