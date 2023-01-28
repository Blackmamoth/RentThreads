const authValidation = require("../../../helpers/joi_validation/tl/auth/threadLord.validation_schema");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helpers/helper_functions/tlAuthFunction");
const ThreadLord = require("../../../models/TL/tlauth/ThreadLord.model");
const RefreshToken = require("../../../models/TL/tlauth/RefreshToken");

const registerThreadLord = asyncHandler(async (req, res) => {
  try {
    const tlDetails = await authValidation.tlRegisterSchema.validateAsync(
      req.body
    );
    const checkTlExists = await ThreadLord.find({ email: tlDetails.email });
    if (checkTlExists?.length) {
      res.status(400);
      throw httpErrors.Conflict(`Email ${tlDetails.email} is already in use`);
    }
    const threadLord = await ThreadLord.create(tlDetails);
    res.status(201).send({
      error: false,
      data: {
        threadLordDetails: {
          _id: threadLord._id,
          username: threadLord.username,
          email: threadLord.email,
          storeName: threadLord.storeName,
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

const loginThreadLord = asyncHandler(async (req, res) => {
  try {
    const tlDetails = await authValidation.tlLoginSchema.validateAsync(
      req.body
    );
    const threadLord = await ThreadLord.findOne({ email: tlDetails.email });
    if (!threadLord) {
      res.status(400);
      throw httpErrors.NotFound(
        "ThreadLord not found, Please check your Email and try again"
      );
    }
    if (await bcrypt.compare(tlDetails.password, threadLord.password)) {
      const access_token = generateAccessToken(threadLord);
      const refresh_token = await generateRefreshToken(threadLord);
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
            threadLordDetails: {
              _id: threadLord._id,
              username: threadLord.username,
              email: threadLord.email,
              storeName: threadLord.storeName,
            },
          },
          message: "Logged In successfully",
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

const refreshThreadLordToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req?.signedCookies?.refresh_token.toString();
    const token = await RefreshToken.findOne({ refreshToken: refreshToken });
    if (!token) {
      res.status(422);
      throw httpErrors.UnprocessableEntity("Cannot process JWT");
    }
    const verifyToken = jwt.verify(
      refreshToken,
      process.env.TL_REFRESH_TOKEN_SECRET
    );
    const threadLordId = verifyToken.threadLordId;
    const threadLord = await ThreadLord.findById(threadLordId);
    if (!threadLord) {
      res.status(404);
      throw httpErrors.NotFound("Thread Lord not found");
    }
    const access_token = generateAccessToken(threadLord);
    const refresh_token = await generateRefreshToken(threadLord);
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
          threadLordDetails: {
            _id: threadLord._id,
            username: threadLord.username,
            email: threadLord.email,
            storeName: threadLord.storeName,
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
  registerThreadLord,
  loginThreadLord,
  refreshThreadLordToken,
};
