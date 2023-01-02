import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import UserApi from "../../api/UserApi";

function SignUp({ setIsSignIn }) {
  const onFinish = (data) => {
    UserApi.userSignUp(data).then(({ status }) => {
      if (status === 200) {
        setIsSignIn((prevState) => !prevState);
      }
    });
  };

  return (
    <Form name="sign-up-form" className="sign-up-form" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Firstname"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input
          autoComplete="off"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Lastname"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          autoComplete="off"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          autoComplete="new-password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        or{" "}
        <span
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={() => setIsSignIn((prevState) => !prevState)}
        >
          back to login page
        </span>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
