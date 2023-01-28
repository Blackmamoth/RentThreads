const inventoryValidation = require("../../../helpers/joi_validation/tl/crud/inventoryCRUD.validation_schema");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");
const Inventory = require("../../../models/TL/tlInventory/Inventory.model");

const addCloth = asyncHandler(async (req, res) => {
  try {
    const clothDetails = await inventoryValidation.addClothSchema.validateAsync(
      req.body
    );
    const cloth = await Inventory.create({
      ...clothDetails,
      threadLordId: req.tl._id,
      storeName: req.tl.storeName,
    });
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
    const clothes = await Inventory.find({
      ...clothFilters,
      threadLordId: req.tl._id,
    });
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

const updateClothes = asyncHandler(async (req, res) => {
  try {
    const clothDetails =
      await inventoryValidation.updateClothSchema.validateAsync(req.body);
    const clothes = await Inventory.findById(clothDetails.clothId);
    if (!clothes) {
      res.status(404);
      throw httpErrors.NotFound("The item you are looking for cannot be found");
    }
    if (!clothes.threadLordId.equals(req.tl._id)) {
      res.status(403);
      throw httpErrors.Forbidden(
        "You are not allowed to make changes in this inventory"
      );
    }
    await clothes.updateOne(clothDetails, { new: true });
    const cloth = await Inventory.findById(clothDetails.clothId);
    res.status(200).send({
      error: false,
      data: {
        cloth,
        message: "Item successfully updated",
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

const deleteCloth = asyncHandler(async (req, res) => {
  try {
    const clothDetails =
      await inventoryValidation.deleteClothSchema.validateAsync(req.body);
    const cloth = await Inventory.findById(clothDetails.clothId);
    if (!cloth) {
      res.status(404);
      throw httpErrors.NotFound("The item you are looking for cannot be found");
    }
    if (!cloth.threadLordId.equals(req.tl._id)) {
      res.status(403);
      throw httpErrors.Forbidden(
        "You are not allowed to make changes in this inventory"
      );
    }
    await cloth.delete();
    res.status(200).send({
      error: false,
      data: {
        message: "Item successfully deleted",
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
  updateClothes,
  deleteCloth,
};
