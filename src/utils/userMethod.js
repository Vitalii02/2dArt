const knex = require("../db/db");
const { DB_USER_TITLE } = require("./constants");

const { isEmpty } = require("lodash");

exports.foundUserById = async (id) => {
  if (!id) {
    throw new Error("Wrong input data");
  }
  const user = await knex(DB_USER_TITLE).where({ id });

  if (isEmpty(user)) {
    throw new Error("User does not exist");
  }
  return user;
};

exports.foundUserByLogin = async (login) => {
  if (!login) {
    throw new Error("Wrong input data");
  }
  const user = await knex(DB_USER_TITLE).where({ login });

  if (isEmpty(user)) {
    throw new Error("User does not exist");
  }
  return user;
};
