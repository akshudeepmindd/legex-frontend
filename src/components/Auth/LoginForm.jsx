import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function LoginForm({
  onFinish,
  handleChange,
  googleLogin,
  facebookLogin,
  email,
  password,
  processing,
  onFinishFailed,
}) {
  return (
    <Form name="loginForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember Me</Checkbox>
        </Form.Item>

        <Link to="/forgot-password" className="login-form-forgot">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={processing}>
          Login
        </Button>
      </Form.Item>

      <Divider>Or</Divider>

      <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Button
            icon={<GoogleOutlined />}
            className="google-button"
            block
            onClick={googleLogin}
          >
            Google
          </Button>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Button
            icon={<FacebookOutlined />}
            className="facebook-button"
            block
            onClick={facebookLogin}
          >
            Facebook
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

LoginForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  onFinishFailed: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  facebookLogin: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default LoginForm;
