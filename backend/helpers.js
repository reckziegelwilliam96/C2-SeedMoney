const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");

async function hashPassword(password) {
  return await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function createToken(user) {
  let payload = {
    username: user.username
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken
};
