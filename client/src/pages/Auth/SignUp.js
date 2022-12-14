import { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import UserApi from "../../api/UserApi";
import { removeJwtToken, setJwtToken } from "../../services/jwtTokenService";

function SignUp({ setIsSignIn }) {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleGoogleAuth,
    });

    google.accounts.id.renderButton(document.getElementById("auth-btn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  function handleGoogleAuth(res) {
    UserApi.userGoogleSignUp(res.credential).then(({ data: { token } }) => {
      if (token) {
        setJwtToken(token);
      } else {
        removeJwtToken();
      }
    });
  }

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
      <Form.Item>
        <span>or sign up with Google</span>
        <div id="auth-btn" />
      </Form.Item>
    </Form>
  );
}

export default SignUp;
