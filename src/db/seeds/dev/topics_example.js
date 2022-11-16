const { DB_TOPICS_TITLE } = require("../../../utils/constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(DB_TOPICS_TITLE).del();
  await knex(DB_TOPICS_TITLE).insert([
    {
      id: 1,
      title: "продам",
      text: "гараж",
      created_at: "12.12.12",
      description: "хороший",
      user_id: 1,
    },
    {
      id: 2,
      title: "куплю",
      text: "гараж",
      created_at: "13.12.13",
      description: "не очень",
      user_id: 2,
    },
    {
      id: 3,
      title: "не продам",
      text: "не гараж",
      created_at: "12.04.22",
      description: "не хороший",
      user_id: 1,
    },
  ]);
};
