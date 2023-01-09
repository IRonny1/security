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

  const deleteItem = (itemId) => {
    ItemApi.deleteItem(itemId).then(({ data }) =>
      setItems((prevState) => {
        const newState = JSON.parse(JSON.stringify(prevState));
        return newState.filter(({ itemId }) => itemId !== data.itemId);
      })
    );
  };

  return (
    <div>
      <Table
        columns={getColumns(onNewItemClick, deleteItem)}
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
