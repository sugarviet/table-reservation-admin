import { Form, Input, Button, Card, Divider } from "antd";
import styles from "./Login.module.css";
import { useLoginWithStaff } from "../../services/Login/service";

const { Meta } = Card;

const Login = () => {
  const { mutate } = useLoginWithStaff();

  const onFinish = (values) => {
    console.log("Received values:", values);
    mutate(values)
  };

  return (
    <div className={styles.container}>
      <Card style={{ width: 400, height: 300 }}>
        <Meta title="Login" />
        <Divider />
        <Form onFinish={onFinish}  name="basic"
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter your phone" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={10}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btnSubmit}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
