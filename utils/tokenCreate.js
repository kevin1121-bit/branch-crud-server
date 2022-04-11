const jwt = require("jsonwebtoken");

exports.createToken = (person, secret) => {
  const { username } = person;
  return jwt.sign({ username: username }, secret);
};
