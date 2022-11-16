const knex = require("../db/db");
const { DB_TOPICS_TITLE } = require("./constants");

const { isEmpty } = require("lodash");

exports.foundTopicsById = async (id) => {
  if (!id) {
    throw new Error("Wrong input data");
  }
  const topics = await knex(DB_TOPICS_TITLE).where({ id });

  if (isEmpty(topics)) {
    throw new Error("Topics does not exist");
  }
  return topics;
};
