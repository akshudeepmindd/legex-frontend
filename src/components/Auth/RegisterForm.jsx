import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Input, Button } from "antd";

const RegisterForm = ({ onFinish, googleLogin, facebookLogin }) => {
  return (
    <Form name="RegisterForm" onFinish={onFinish}>
      <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

RegisterForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  facebookLogin: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  // confirmPassword: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterForm;
