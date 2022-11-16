const { DB_USER_TITLE } = require("../../../utils/constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(DB_USER_TITLE).del();
  await knex(DB_USER_TITLE).insert([
    {
      id: 1,
      login: "Ivan132",
      name: "Ivan",
      last_name: "Ivanov",
      role: "admin",
      password: "123123123",
      department: "it",
      position: "middle",
    },
    {
      id: 2,
      login: "Serr321",
      name: "Alex",
      last_name: "neIvanov",
      role: "user",
      password: "123123123",
      department: "office",
      position: "train",
    },
    {
      id: 3,
      login: "Vitaliidddd",
      name: "Vitalii",
      last_name: "example",
      role: "noDev",
      password: "dasf",
      department: "admin",
      position: "admin",
    },
  ]);
};
