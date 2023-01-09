const { v4: uuidv4 } = require("uuid");

const Item = require("../models/Item");
const User = require("../models/User");
const ItemDto = require("../dtos/ItemDto");

class ItemService {
  async getAllItems() {
    const items = await Item.find({});
    const creatorIds = [...new Set(items.map(({ creatorId }) => creatorId))];
    const users = await User.find({ userId: { $in: creatorIds } });
    return items.map((item) => {
      const creator = users.find(({ userId }) => userId === item.creatorId);
      item.creator = `${creator.firstName} ${creator.lastName}`;
      return new ItemDto(item);
    });
  }

  async getItemById(itemId) {
    const item = await Item.findOne({ itemId: itemId });
    return new ItemDto(item);
  }

  async createItem(req) {
    const { itemName, itemDescription } = req.body;
    const { userId } = req.user;

    const item = await Item.create({
      itemId: uuidv4(),
      itemName: itemName,
      itemDescription: itemDescription,
      creatorId: userId,
      isItemDone: false,
    });

    return new ItemDto(item);
  }

  async updateItem(itemId, newValue) {
    const item = await Item.findOneAndUpdate({ itemId }, { newValue });
    return new ItemDto(item);
  }

  async deleteItem(itemId) {
    return Item.findOneAndDelete({ itemId });
  }
}

module.exports = new ItemService();
