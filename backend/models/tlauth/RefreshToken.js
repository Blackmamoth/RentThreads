const mongoose = require("mongoose");

const RefreshToken = new mongoose.Schema(
  {
    threadLordId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "User Id required"],
    },
    refreshToken: {
      type: String,
      required: [true, "Refresh token required"],
      unique: true,
    },
  },
  { timestamps: true }
);

RefreshToken.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("refresh_token", RefreshToken);
