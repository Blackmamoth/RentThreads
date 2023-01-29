const authValidation = require("../../../helpers/joi_validation/renter/auth/renterAuth.validation_schema");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helpers/helper_functions/renterAuthFunctions");
const Renter = require("../../../models/Renter/auth/Renter.model");
const RefreshToken = require("../../../models/Renter/auth/RefreshToken");

const registerRenter = asyncHandler(async (req, res) => {
  try {
    const renterDetails =
      await authValidation.renterRegisterSchema.validateAsync(req.body);
    const renterExists = await Renter.find({
      email: renterDetails.email,
    });
    if (renterExists?.length) {
      res.status(409);
      throw httpErrors.Conflict(
        `Email ${renterDetails.email} is already in use`
      );
    }
    const renter = await Renter.create(renterDetails);
    res.status(201).send({
      error: false,
      data: {
        renterDetails: {
          _id: renter._id,
          username: renter.username,
          email: renter.email,
        },
        message: "You are successfully registered",
      },
    });
  } catch (error) {
    if (error?.isJoi) {
      res.status(422);
    }
    res.send({
      error: true,
      data: {
        message: error.message,
      },
    });
  }
});

const loginRenter = asyncHandler(async (req, res) => {
  try {
    const renterDetails = await authValidation.renterLoginSchema.validateAsync(
      req.body
    );
    const renter = await Renter.findOne({ email: renterDetails.email });
    if (!renter) {
      res.status(400);
      throw httpErrors.NotFound(
        "Renter not found, Please check your Email and try again"
      );
    }
    if (await bcrypt.compare(renterDetails.password, renter.password)) {
      const access_token = generateAccessToken(renter);
      const refresh_token = await generateRefreshToken(renter);
      res
        .status(200)
        .cookie("refresh_token", refresh_token, {
          secure: process.env.NODE_ENV == "production",
          signed: true,
          httpOnly: true,
          sameSite: true,
          expires: new Date(moment().endOf("day")),
        })
        .send({
          error: false,
          data: {
            access_token,
            renterDetails: {
              _id: renter._id,
              username: renter.username,
              email: renter.email,
            },
            message: "Logged In successfully",
          },
        });
    }
  } catch (error) {
    if (error?.isJoi) {
      res.status(422);
    }
    res.send({
      error: true,
      data: {
        message: error.message,
      },
    });
  }
});

const refreshRenterToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req?.signedCookies?.refresh_token.toString();
    const token = await RefreshToken.findOne({ refreshToken: refreshToken });
    if (!token) {
      res.status(422);
      throw httpErrors.UnprocessableEntity("Cannot process JWT");
    }
    const verifyToken = jwt.verify(
      refreshToken,
      process.env.RENTER_REFRESH_TOKEN_SECRET
    );
    const renterId = verifyToken.renterId;
    const renter = await Renter.findById(renterId);
    if (!renter) {
      res.status(404);
      throw httpErrors.NotFound("Renter not found");
    }
    const access_token = generateAccessToken(renter);
    const refresh_token = await generateRefreshToken(renter);
    await token.delete();
    res
      .cookie("refresh_token", refresh_token, {
        secure: process.env.NODE_ENV == "production",
        signed: true,
        httpOnly: true,
        sameSite: true,
        expires: new Date(moment().endOf("day")),
      })
      .send({
        error: false,
        data: {
          access_token,
          renterDetails: {
            _id: renter._id,
            username: renter.username,
            email: renter.email,
          },
        },
      });
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
  registerRenter,
  loginRenter,
  refreshRenterToken,
};
