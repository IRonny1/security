import { useEffect, useState } from "react";
import { Table } from "antd";

import ItemApi from "../../api/ItemApi";

import CreateItemModal from "./CreateItemModal";
import { getColumns } from "./itemsHelperData";

function Items() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    ItemApi.getAllItems().then(({ data }) => {
      setItems(data);
    });
  }, []);

  const onNewItemClick = () => {
    setIsModalOpen(true);
  };

  const completeItem = (itemId) => {
    ItemApi.completeItem(itemId).then(({ data }) => {
      setItems((prevState) => {
        return prevState.map((item) =>
          item.itemId === data.itemId ? data : item
        );
      });
    });
  };

  const deleteItem = (itemId) => {
    ItemApi.deleteItem(itemId).then(({ data }) =>
      setItems((prevState) => {
        return prevState.filter(({ itemId }) => itemId !== data.itemId);
      })
    );
  };

  return (
    <div>
      <Table
        columns={getColumns(onNewItemClick, completeItem, deleteItem)}
        dataSource={items.map((item) => ({ ...item, key: item.itemId }))}
      />
      <CreateItemModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setItems={setItems}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Items;
