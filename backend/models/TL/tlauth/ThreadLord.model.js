const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ThreadLord = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
  },
  storeName: {
    type: String,
    required: [true, "Store's name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

ThreadLord.pre("save", async function (next) {
  let tl = this;
  if (!tl.isModified()) return next();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("threadLord", ThreadLord);
