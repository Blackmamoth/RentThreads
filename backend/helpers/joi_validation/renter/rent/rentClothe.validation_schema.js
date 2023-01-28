const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);
joi.objectId = require("joi-objectid")(joi);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const rentClothSchema = joi.object({
  clothId: joi.objectId().required(),
  rentPeriod: joi.date().min(tomorrow).required(),
  rentCharge: joi.number().min(100).required(),
});

const getClothesSchema = joi.object({
  storeName: joi.string().trim().allow(null),
  rentPerDay: joi.number().min(100).allow(null),
  stock: joi.number(),
});

module.exports = {
  rentClothSchema,
  getClothesSchema,
};
