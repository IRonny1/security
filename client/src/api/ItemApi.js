import authorizedAxios from "./authorizedAxios";

const ItemApi = {
  getAllItems() {
    return authorizedAxios.get("/api/item/all");
  },
  createItem(data) {
    return authorizedAxios.post("/api/item/create", data);
  },
  deleteItem(itemId) {
    return authorizedAxios.post(`/api/item/${itemId}/delete`);
  },
};

export default ItemApi;
