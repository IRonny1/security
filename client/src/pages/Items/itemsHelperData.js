import { Button, Space } from "antd";

export const getColumns = (newItemCallback, deleteItemCallback) => [
  {
    title: "Name",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Description",
    dataIndex: "itemDescription",
    key: "itemDescription",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Status",
    key: "status",
    render: (_, { isItemDone }) => {
      return <span>{isItemDone ? "DONE" : "IN PROGRESS"}</span>;
    },
  },
  {
    title: (
      <Button onClick={newItemCallback} type="primary">
        New
      </Button>
    ),
    dataIndex: "actions",
    key: "actions",
    render: (_, { itemId }) => {
      return (
        <Space size="middle">
          <span style={{ color: "#0000EE", cursor: "pointer" }}>Done</span>
          <span
            style={{ color: "#0000EE", cursor: "pointer" }}
            onClick={() => deleteItemCallback(itemId)}
          >
            Delete
          </span>
        </Space>
      );
    },
  },
];
