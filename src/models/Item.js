const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  itemId: { type: String, unique: true, required: true },
  itemName: { type: String, required: true },
  itemDescription: { type: String },
  creatorId: { type: String, required: true },
  isItemDone: { type: Boolean, default: false },
});

const Item = model("Item", ItemSchema);

module.exports = Item;
