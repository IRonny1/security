import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";

import ItemApi from "../../api/ItemApi";

function CreateItemModal({ isModalOpen, setIsModalOpen, onCancel }) {
  const [form] = useForm();

  const onFinish = (data) => {
    ItemApi.createItem(data).then(({ status }) => {
      if (status === 200) {
        form.resetFields();
        setIsModalOpen(false);
      }
    });
  };

  const modalFooter = (
    <Button
      form="new-item-form"
      key="new-item-form"
      type="primary"
      htmlType="submit"
    >
      Submit
    </Button>
  );

  return (
    <Modal
      title="Create new item"
      open={isModalOpen}
      onCancel={onCancel}
      footer={modalFooter}
    >
      <Form form={form} name="new-item-form" onFinish={onFinish}>
        <Form.Item name="itemName">
          <Input placeholder="Write item name" />
        </Form.Item>
        <Form.Item name="itemDescription">
          <Input placeholder="Write item description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateItemModal;
