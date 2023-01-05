const { v4: uuidv4 } = require("uuid");

const HttpError = require("../exceptions/HttpError");

const Item = require("../models/Item");
const ItemDto = require("../dtos/ItemDto");

class ItemService {
  async getAllItems() {
    const items = await Item.find({});
    return items.map((item) => new ItemDto(item));
  }

  async getItemById(itemId) {
    const item = await Item.findOne({ itemId: itemId });
    return new ItemDto(item);
  }

  async createItem({ itemName, itemDescription, creatorId }) {
    const item = Item.create({
      itemId: uuidv4(),
      itemName: itemName,
      itemDescription: itemDescription,
      creatorId: creatorId,
      isItemDone: false,
    });

    return new ItemDto(item);
  }

  async updateItem(itemId, newValue) {
    const item = Item.findOneAndUpdate({ itemId }, { newValue });
    return new ItemDto(item);
  }

  async deleteItem(itemId) {
    return Item.findOneAndDelete({ itemId });
  }
}

module.exports = new ItemService();
