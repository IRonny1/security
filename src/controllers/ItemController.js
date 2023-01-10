const itemService = require("../services/ItemService");

class ItemController {
  async getAllItems(req, res, next) {
    try {
      const items = await itemService.getAllItems();
      res.send(items);
    } catch (e) {
      next(e);
    }
  }

  async getItemById(req, res, next) {
    try {
      const { itemId } = req.params;
      const item = await itemService.getItemById(itemId);
      res.send(item);
    } catch (e) {
      next(e);
    }
  }

  async createItem(req, res, next) {
    try {
      const itemData = await itemService.createItem(req);
      res.send(itemData);
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req, res, next) {
    try {
      const { body, user } = req;
      const { itemId } = req.params;
      const item = await itemService.updateItem(user.userId, itemId, body);

      res.send(item);
    } catch (e) {
      next(e);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const item = await itemService.deleteItem(itemId);
      res.send(item);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ItemController();
