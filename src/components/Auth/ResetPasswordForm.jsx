import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class ResetPasswordForm extends Component {
  render() {
    return (
      <Form
        name="ResetPassword"
        onFinish={this.props.onFinish}
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="New password"
            value={this.props.password}
            onChange={this.props.onPasswordChange}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your confirm password!' }]}
        >
          <Input.Password
            placeholder="Confirm password"
            value={this.props.confirmPassword}
            onChange={this.props.onConfirmPasswordChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>Reset Password</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default ResetPasswordForm;
