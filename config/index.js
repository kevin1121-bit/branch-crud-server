require("dotenv").config();

module.exports = {
  db: {
    url: process.env.MONGO_URL_DEV,
  },
  origins: [`${process.env.ORIGIN}:${process.env.PORT_CLIENT}/`],
  port: process.env.PORT,
};
