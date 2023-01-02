import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import UserApi from "../../api/UserApi";
import { removeJwtToken, setJwtToken } from "../../services/jwtTokenService";

function SignIn({ setIsSignIn }) {
  const onFinish = ({ email, password }) => {
    UserApi.userLogin({ email, password }).then(({ data }) => {
      if (data) {
        setJwtToken(data.token);
      } else {
        removeJwtToken();
      }
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="https://google.com">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or{" "}
        <span
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={() => setIsSignIn((prevState) => !prevState)}
        >
          register now!
        </span>
      </Form.Item>
    </Form>
  );
}

export default SignIn;
