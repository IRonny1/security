module.exports = class ItemDto {
  itemId;
  itemName;
  itemDescription;
  creatorId;
  creator;
  isItemDone;

  constructor(model) {
    this.itemId = model.itemId;
    this.itemName = model.itemName;
    this.itemDescription = model.itemDescription;
    this.creatorId = model.creatorId;
    this.creator = model.creator;
    this.isItemDone = model.isItemDone;
  }
};
