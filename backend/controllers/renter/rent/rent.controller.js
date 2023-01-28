const rentValidation = require("../../../helpers/joi_validation/renter/rent/rentClothe.validation_schema");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");
const Inventory = require("../../../models/TL/tlInventory/Inventory.model");
const RentedCloth = require("../../../models/Renter/rent/RentedCloth.model");
const ThreadLord = require("../../../models/TL/tlauth/ThreadLord.model");
const { sendMail } = require("../../../helpers/helper_functions/mail.helper");

const rentCloth = asyncHandler(async (req, res) => {
  try {
    const rentDetails = await rentValidation.rentClothSchema.validateAsync(
      req.body
    );
    const cloth = await Inventory.findById(rentDetails.clothId);
    if (!cloth) {
      res.status(404);
      throw httpErrors.NotFound("Item not found");
    }
    if (cloth.stock < 1) {
      res.status(409);
      throw httpErrors.Conflict("Item out of stock, please try again later");
    }
    const rent = await RentedCloth.create({
      ...rentDetails,
      cloth: rentDetails.clothId,
      renterId: req.renter._id,
    });
    const threadLord = await ThreadLord.findById(cloth.threadLordId);
    await cloth.updateOne({ stock: cloth.stock - 1 });
    await rent.populate({ path: "cloth", select: "-threadLordId" });
    sendMail(
      threadLord.email,
      "You got a new RENTER",
      `${req.renter.username} Rented an item of your's: ${cloth.title}`
    );
    res.status(201).send({
      error: false,
      rentDetails: rent,
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

module.exports = {
  rentCloth,
  getClothes,
};
