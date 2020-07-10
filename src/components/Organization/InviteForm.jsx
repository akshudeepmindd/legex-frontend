import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class InviteForm extends Component {
  render() {
    return (
      <Form
        name="InviteForm"
        onFinish={this.props.onFinish}
      >
        <Form.Item
          name="name"
        >
          <Input
            type="text"
            placeholder="name"
            value={this.props.name}
            onChange={this.props.onNameChange}
          />
        </Form.Item>

        <Form.Item
          name="email"
        >
          <Input
            type="email"
            placeholder="email"
            value={this.props.email}
            onChange={this.props.onEmailChange}
          />
        </Form.Item>

        <Form.Item
          name="phone"
        >
          <Input
            type="phone"
            placeholder="phone"
            value={this.props.phone}
            onChange={this.props.onPhoneChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Send Invite</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default InviteForm;
