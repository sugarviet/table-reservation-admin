import { Form, Input, Button, Card, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './Login.module.css';

const { Meta } = Card;

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Perform login logic here
    localStorage.setItem("token", "123");
    navigate(pathname);
  };

  return (
    <div className={styles.container}>
      <Card style={{width: 400, height: 300}}>
        <Meta title="Login" />
        <Divider />
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
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
            <Button type="primary" htmlType="submit" className={styles.btnSubmit}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
