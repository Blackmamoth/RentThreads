const mongoose = require("mongoose");

const Inventory = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
  },
  rentPerHour: {
    type: Number,
    required: [true, "Rent Per Hour required"],
  },
  stock: {
    type: Number,
    required: [true, "Atleast 1 Item required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  storeName: {
    type: String,
    required: [true, "Store name is required"],
  },
  threadLordId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "Thread Lord required"],
  },
});

module.exports = mongoose.model("inventory", Inventory);
