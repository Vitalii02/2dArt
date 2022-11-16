const bcrypt = require("bcrypt");

const knex = require("../db/db");
const { DB_USER_TITLE, BCRYPT_SALT_ROUNDS } = require("../utils/constants");
const { foundUserById } = require("../utils/userMethod");

exports.getUsers = async (req, res) => {
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

    const data = await knex(DB_USER_TITLE)
      .where(options)
      .orderBy("created_at", sort);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Body invalid");
    }

    const { password, ...data } = req.body;

    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    await knex(DB_USER_TITLE).insert({ ...data, password: hashPassword });

    return res.status(201).json({ message: "User has been created!" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;

    await foundUserById(id);
    await knex(DB_USER_TITLE).where({ id }).update(req.body);
    return res.status(201).json({ message: `User id=${id}, has been update!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;

    await foundUserById(id);
    await knex(DB_USER_TITLE).where({ id }).delete(req.body);
    return res
      .status(201)
      .json({ message: `User id=${id}, has been deleted!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
