const mongoose = require("mongoose");
const Renter = require("../auth/Renter.model");
const ThreadLord = require("../../TL/tlauth/ThreadLord.model");
const { sendMail } = require("../../../helpers/helper_functions/mail.helper");
const InventoryModel = require("../../TL/tlInventory/Inventory.model");

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
  status: {
    type: String,
    enum: ["valid", "expired"],
    default: "valid",
  },
});

RentedCloth.methods.onRentPeriodOver = async (rent) => {
  const renter = await Renter.findById(rent.renterId);
  const cloth = await InventoryModel.findById(rent.cloth);
  const threadLord = await ThreadLord.findById(cloth.threadLordId);
  sendMail(
    renter.email,
    "Your RENTED item has been expired",
    `The item you rented '${cloth.title}', will be collected by ${threadLord.storeName}, please be ready`
  );
  sendMail(
    threadLord.email,
    "You're about to get you item back",
    `A stock of your item '${cloth.title}' will be returned by ${renter.username}`
  );
  await cloth.updateOne({ stock: cloth.stock + 1 });
};

const Rental = mongoose.model("rentedCloth", RentedCloth);

setInterval(() => {
  Rental.findOneAndUpdate(
    { $expr: { $lt: ["$$NOW", "$rentPeriod"] } },
    { $set: { status: "expired" } },
    { new: true },
    (err, rental) => {
      if (rental) rental.onRentPeriodOver(rental);
    }
  );
}, 60000);

module.exports = Rental;
