import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class ForgotPasswordForm extends Component {
  render() {
    return (
      <Form
        name="ForgotPassword"
        onFinish={this.props.onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
            value={this.props.email}
            onChange={this.props.onEmailChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>Send password reset link</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default ForgotPasswordForm;
