const jwt = require("jsonwebtoken");
const moment = require("moment");
const RefreshToken = require("../../models/TL/tlauth/RefreshToken");

const generateAccessToken = (threadLord) => {
  return jwt.sign(
    { threadLordId: threadLord._id },
    process.env.TL_ACCESS_TOKEN_SECRET,
    {
      expiresIn: 1800,
    }
  );
};

const generateRefreshToken = async (threadLord) => {
  const token = jwt.sign(
    { threadLordId: threadLord._id },
    process.env.TL_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  await RefreshToken.create({
    threadLordId: threadLord._id,
    refreshToken: token,
  }).catch((error) => {
    throw httpErrors.InternalServerError(
      "An error occured while saving refresh token to MongoDB Server"
    );
  });
  return token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
