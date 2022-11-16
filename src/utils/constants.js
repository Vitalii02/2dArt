//-----------------------------------DB----------------------------------------\\

const DB_USER_TITLE = "user";
const DB_TOPICS_TITLE = "topics";
const BCRYPT_SALT_ROUNDS = 10;
const JWT_EXPIRE_TOKEN = "15m";
const JWT_REFRESH_TOKEN = "1d";

module.exports = {
  DB_USER_TITLE,
  DB_TOPICS_TITLE,
  BCRYPT_SALT_ROUNDS,
  JWT_EXPIRE_TOKEN,
  JWT_REFRESH_TOKEN,
};
