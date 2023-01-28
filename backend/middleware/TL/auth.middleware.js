const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ThreadLord = require("../../models/TL/tlauth/ThreadLord.model");
const httpErrors = require("http-errors");

const tlProtectedRoute = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const verifyJWT = jwt.verify(token, process.env.TL_ACCESS_TOKEN_SECRET);
        req.tl = await ThreadLord.findById(verifyJWT.threadLordId).select(
          "-password"
        );
        next();
      } catch (error) {
        throw httpErrors.Unauthorized("Request not authorized");
      }
    }
    if (!token) {
      throw httpErrors.Unauthorized("Request not authorized, no token");
    }
  } catch (error) {
    res.send({
      error: true,
      data: {
        message: error.message,
      },
    });
  }
});

module.exports = {
  tlProtectedRoute,
};
