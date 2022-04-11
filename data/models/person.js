const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 100,
    minLength: 3,
    trim: true,
    required: true,
  },
  firstName: { type: String, maxlength: 100, minlength: 3, required: true },
  lastName: { type: String, maxlength: 100, minlength: 3, required: true },
  image: { type: String, minLength: 2, maxlength: 150, trim: true },
  password: {
    type: String,
    maxlength: 100,
    minLength: 3,
    required: true,
  },
});

schema.index({ username: "text" });

module.exports = mongoose.model("person", schema);
