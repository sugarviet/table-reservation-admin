import PropTypes from "prop-types";
import { Button, Modal, Form, Select, InputNumber } from "antd";
import useUpdateTable from "./hooks/useUpdateTable";
import { useUpdateOneTable } from "../../../../services/Home/services";

const { Option } = Select;

const UpdateTable = (props) => {
  const [form] = Form.useForm();
  const { isModalVisible, handleModalClose, selectedTableNumber } = props;

  const {data, isLoading } = useUpdateTable(selectedTableNumber);

  const {mutate} = useUpdateOneTable();

  if(isLoading){
    return <div>Loading...</div>
  }

  const handleCapacityChange = (value) => {
    form.setFieldsValue({ depositPrice: value }); 
  };

  const handlePriceChange = (value) => {
    form.setFieldsValue({ capacity: value }); 
  };


  const initialValues = data ? {
    tableNumber: data[0].tableNumber,
    depositPrice: +data[0].depositPrice.$numberDecimal,
    capacity: data[0].capacity
  } : {}


  const onFinish = (values) => {
    console.log("Success:", values);
    mutate(values)
    handleModalClose()
    // update(values)
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
        initialValues={initialValues}
        name="basic"
        form={form}
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
          <Select onChange={handleCapacityChange}>
            <Option value={4}>4</Option>
            <Option value={6}>6</Option>
            <Option value={10}>10</Option>
          </Select>
        </Form.Item>
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
          <Select onChange={handlePriceChange}>
            <Option value={4}>4$</Option>
            <Option value={6}>6$</Option>
            <Option value={10}>10$</Option>
          </Select>
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
  selectedTableNumber: PropTypes.number.isRequired,
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
};

export default UpdateTable;
