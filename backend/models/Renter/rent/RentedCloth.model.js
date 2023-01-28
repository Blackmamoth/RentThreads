const mongoose = require("mongoose");

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const RentedCloth = new mongoose.Schema({
  cloth: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "ClothId is required"],
    ref: "inventory",
  },
  rentPeriod: {
    type: Date,
    min: tomorrow,
    required: [true, "Rent period is required"],
  },
  rentCharge: {
    type: Number,
    required: [true, "Rent charge is required"],
  },
  renterId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "RenterId is required"],
  },
});

module.exports = mongoose.model("rentedCloth", RentedCloth);
