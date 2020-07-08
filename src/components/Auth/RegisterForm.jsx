import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button, Divider } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

class RegisterForm extends Component {
  render() {
    return (
      <Form
        name="RegisterForm"
        onFinish={this.props.onFinish}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input
                placeholder="First name"
                value={this.props.firstName}
                onChange={this.props.onFirstNameChange}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input
                placeholder="Last name"
                value={this.props.lastName}
                onChange={this.props.onLastNameChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input
            placeholder="Phone"
            value={this.props.phone}
            onChange={this.props.onPhoneChange}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            placeholder="Email"
            value={this.props.email}
            onChange={this.props.onEmailChange}
          />
        </Form.Item>

        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Password"
                value={this.props.password}
                onChange={this.props.onPasswordChange}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Password do not match!' }]}
            >
              <Input.Password
                placeholder="Confirm Password"
                value={this.props.confirmPassword}
                onChange={this.props.onConfirmPasswordChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>Register</Button>
        </Form.Item>

        <Divider>Or</Divider>

        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Button icon={<GoogleOutlined />} className="google-button" block>Google</Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Button icon={<FacebookOutlined />} className="facebook-button" block>Facebook</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  onFinish: PropTypes.func,
  onFirstNameChange: PropTypes.func,
  onLastNameChange: PropTypes.func,
  onPhoneChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onConfirmPasswordChange: PropTypes.func,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
}

export default RegisterForm;
