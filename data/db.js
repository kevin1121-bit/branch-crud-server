const mongoose = require("mongoose");
const config = require("../config");
const Person = require("./models/person");

const doConnection = async () => {
  try {
    await mongoose.connect(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};
doConnection();

module.exports = { Person };
