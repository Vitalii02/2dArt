const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_EXPIRE_TOKEN, JWT_REFRESH_TOKEN } = require("../utils/constants");
const { foundUserByLogin } = require("../utils/userMethod");

exports.login = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Error data");
    }
    const { login, password } = req.body;
    const user = await foundUserByLogin(login);

    const checkPassword = await bcrypt.compare(password, user[0].password);
    if (!checkPassword) {
      throw new Error("Error password or email");
    }

    const accessToken = jwt.sign(
      { id: user[0].id, department: user[0].department },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRE_TOKEN,
      }
    );
    const refreshToken = jwt.sign(
      { id: user[0].id, department: user[0].department },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_REFRESH_TOKEN,
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "logout" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    return res.status(200).json({ refreshToken: req.cookies });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
