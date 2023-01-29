const rentValidation = require("../../../helpers/joi_validation/renter/rent/rentClothe.validation_schema");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");
const Inventory = require("../../../models/TL/tlInventory/Inventory.model");
const RentedCloth = require("../../../models/Renter/rent/RentedCloth.model");
const ThreadLord = require("../../../models/TL/tlauth/ThreadLord.model");
const { sendMail } = require("../../../helpers/helper_functions/mail.helper");

const rentCloth = asyncHandler(async (req, res) => {
  try {
    let rentDetails = await rentValidation.rentClothSchema.validateAsync(
      req.body
    );
    rentDetails = rentDetails.clothDetails.map((detail) => {
      return {
        cloth: detail.clothId,
        rentPeriod: detail.rentPeriod,
        rentCharge: detail.rentCharge,
        renterId: req.renter._id,
      };
    });
    const clothIds = rentDetails.map((detail) => detail.cloth);
    const rent = await RentedCloth.insertMany(rentDetails);
    const clothes = await Inventory.find({ _id: { $in: clothIds } });
    const threadLordIds = clothes.map((cloth) => cloth.threadLordId);
    const threadLord = await ThreadLord.find({ _id: { $in: threadLordIds } });
    await clothes.forEach((cloth) =>
      cloth.updateOne({ stock: cloth.stock - 1 })
    );

    threadLord.forEach((lord, index) => {
      const message = `${req.renter.username} Rented an item of yours: ${
        clothes[index].title
      }\nStock left: ${clothes[index].stock - 1}`;
      sendMail(lord.email, "You got a RENTER", message);
    });
    res.status(201).send({
      error: false,
      rentDetails: rent,
      clothes,
    });
  } catch (error) {
    console.log(error);
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

const getClothes = asyncHandler(async (req, res) => {
  try {
    const clothFilters = await rentValidation.getClothesSchema.validateAsync(
      req.body
    );
    const clothes = await Inventory.find(clothFilters).select("-threadLordId");
    res.status(200).send({
      error: false,
      data: {
        clothDetails: clothes,
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

const getRentedClothes = asyncHandler(async (req, res) => {
  try {
    const clothFilters = await rentValidation.getClothesSchema.validateAsync(
      req.body
    );
    const clothes = await RentedCloth.find({
      ...clothFilters,
      renterId: req.renter._id,
    }).populate("cloth");

    res.status(200).send({
      error: false,
      data: {
        clothDetails: clothes,
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

module.exports = {
  rentCloth,
  getClothes,
  getRentedClothes,
};
