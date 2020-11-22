import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button} from "antd";
//import { Link } from "react-router-dom";

const LoginForm = ({ onFinish, googleLogin, facebookLogin, loading }) => {
  return (
    <Form name="loginForm" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {/* 
          <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember Me</Checkbox>
        </Form.Item>

        <Link to="/forgot-password" className="login-form-forgot">
          Forgot password
        </Link>
        </Form.Item>
      */}

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  facebookLogin: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
