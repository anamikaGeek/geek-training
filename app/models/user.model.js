const mongoose = require("mongoose");
const UserData = mongoose.model(
  "UserData",
  new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      address: String,
      email: String,
      phone: String,
      userName: String,
      password: String
    },
    { timestamps: true }
  )
);
module.exports = UserData;