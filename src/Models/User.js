const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  middleName: String,
  email: String,
  login: String,
  phone: String,
  avatar: String,
  password: String,
});

module.exports = User;
