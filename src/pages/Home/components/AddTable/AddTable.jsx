import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, Select, InputNumber } from "antd";
import { useAddOneTable } from "../../../../services/Home/services";

const { Option } = Select;
// const { TextArea } = Input;

const AddTable = (props) => {
  const [form] = Form.useForm();
  const {mutate} = useAddOneTable();
  const { isModalVisible, handleModalClose } = props;
  const [capacity, setCapacity] = useState(4);

  // form.setFieldsValue({depositPrice: 2})

  const onFinish = (values) => {
    console.log("Success:", values);
    mutate(values);
    handleModalClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCapacityChange = (value) => {
    setCapacity(value);
    form.setFieldsValue({ depositPrice: value }); // Update the "Deposit" value based on the selected "Capacity"
  };

  const handlePriceChange = (value) => {
    form.setFieldsValue({ capacity: value }); // Update the "Deposit" value based on the selected "Price"
    setCapacity(value); // Update the "Capacity" based on the selected "Price"
  };
  return (
    <Modal
      title={"Add more tables"}
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <Form
      form={form}
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
          label="Table's number"
          name="tableNumber"
          rules={[
            {
              required: true,
              message: "Please input your table's number!",
            },
          ]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
        {/*  */}
        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[
            {
              required: true,
              message: "Please input your capacity in table!",
            },
          ]}
        >
          <Select onChange={handleCapacityChange} value={capacity}>
            <Option value={4}>4</Option>
            <Option value={6}>6</Option>
            <Option value={10}>10</Option>
          </Select>
        </Form.Item>
        {/*  */}
        {/* <Form.Item
          label="Time range"
          name="timeRangeType"
          rules={[
            {
              required: true,
              message: "Please input your time range in table!",
            },
          ]}
        >
          <Select>
            <Option value={"4h"}>4h</Option>
            <Option value={"6h"}>6h</Option>
            <Option value={"10h"}>10h</Option>
          </Select>
        </Form.Item> */}
        {/*  */}
        {/*  */}
        <Form.Item
          label="Deposit"
          name="depositPrice"
          rules={[
            {
              required: true,
              message: "Please input your deposit",
            },
          ]}
        >
          <Select onChange={handlePriceChange} value={capacity}>
            <Option value={4}>4$</Option>
            <Option value={6}>6$</Option>
            <Option value={10}>10$</Option>
            {/* {form.getFieldValue("capacity") === 4 ? (
              <Option value={4}>4$</Option>
            ) : (
              <>
                <Option value={6}>6$</Option>
                <Option value={10}>10$</Option>
              </>
            )} */}
          </Select>
        </Form.Item>
        {/*  */}
        {/* <Form.Item
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
        </Form.Item> */}

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

AddTable.propTypes = {
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
};

export default AddTable;
