const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Renter = require("../../models/Renter/auth/Renter.model");
const httpErrors = require("http-errors");

const renterProtectedRoute = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const verifyJWT = jwt.verify(
          token,
          process.env.RENTER_ACCESS_TOKEN_SECRET
        );
        req.renter = await Renter.findById(verifyJWT.renterId).select(
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
  renterProtectedRoute,
};
