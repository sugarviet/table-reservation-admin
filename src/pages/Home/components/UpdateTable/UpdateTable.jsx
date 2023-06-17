import PropTypes from "prop-types";
import { Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const UpdateTable = (props) => {
  const { isModalVisible, handleModalClose } = props;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title={"Update tables"}
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <Form
        name="basic"
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Table's name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your table's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/*  */}
        <Form.Item
          label="Seats"
          name="seats"
          rules={[
            {
              required: true,
              message: "Please input your seats in table!",
            },
          ]}
        >
          <Select>
            <Option value={4}>4</Option>
            <Option value={6}>6</Option>
            <Option value={10}>10</Option>
          </Select>
        </Form.Item>
        {/*  */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          <TextArea rows={8} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdateTable.propTypes = {
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
};

export default UpdateTable;
