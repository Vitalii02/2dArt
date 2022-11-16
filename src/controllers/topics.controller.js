const knex = require("../db/db");
const { DB_TOPICS_TITLE } = require("../utils/constants");
const { foundTopicsById } = require("../utils/topicsMethods");
const { getUserId } = require("../utils/getUserId");

exports.getFeed = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Invalid value");
    }

    const options = {};

    const id = req.query.id;
    const sort = req.query.sort ?? "ASC";

    if (id) {
      options.id = id;
    }

    const data = await knex(DB_TOPICS_TITLE)
      .where(options)
      .orderBy("created_at", sort);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.createTopics = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Body invalid");
    }
    const userId = getUserId(req.headers.authorization);
    await knex(DB_TOPICS_TITLE).insert({ ...req.body, user_id: userId });
    req.io.emit(
      "createTopics",
      console.log(req.body.title, req.body.description)
    );
    return res.status(201).json({ message: "Topics has been created!" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.updateTopics = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;

    await foundTopicsById(id);
    await knex(DB_TOPICS_TITLE).where({ id: id }).update(req.body);
    return res
      .status(201)
      .json({ message: `Topics id=${id}, has been update!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.deleteTopics = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;

    await foundTopicsById(id);
    await knex(DB_TOPICS_TITLE).where({ id: id }).delete(req.body);
    return res
      .status(201)
      .json({ message: `Topics id=${id}, has been deleted!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
