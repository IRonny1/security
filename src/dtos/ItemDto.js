module.exports = class ItemDto {
  itemId;
  itemName;
  itemDescription;
  creatorId;
  isItemDone;

  constructor(model) {
    this.itemId = model.itemId;
    this.itemName = model.itemName;
    this.itemDescription = model.itemDescription;
    this.creatorId = model.creatorId;
    this.isItemDone = model.isItemDone;
  }
};
