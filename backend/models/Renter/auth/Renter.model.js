const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Renter = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already in use"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in user"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

Renter.pre("save", async function (next) {
  let renter = this;
  if (!renter.isModified()) return next();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("renter", Renter);
