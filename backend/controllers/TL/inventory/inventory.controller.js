const inventoryValidation = require("../../../helpers/joi_validation/tl/crud/inventoryCRUD.validation_schema");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");
const Inventory = require("../../../models/TL/tlInventory/Inventory.model");

const addCloth = asyncHandler(async (req, res) => {
  try {
    const clothDetails = await inventoryValidation.addClothSchema.validateAsync(
      req.body
    );
    const cloth = await Inventory.create(clothDetails);
    res.status(201).send({
      error: false,
      data: {
        cloth,
        message: "Item successfully added to inventory",
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

const getClothes = asyncHandler(async (req, res) => {
  try {
    const clothFilters =
      await inventoryValidation.getClothesSchema.validateAsync(req.body);
    const clothes = await Inventory.find(clothFilters);
    res.status(200).send({
      error: false,
      data: {
        clothes,
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
  addCloth,
  getClothes,
};
