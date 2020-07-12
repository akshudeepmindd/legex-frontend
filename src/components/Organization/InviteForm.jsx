import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          rules={[{ required: true, message: 'Please input invite name!' }]}
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
          rules={[{ required: true, message: 'Please input invite email!' }]}
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
          rules={[{ required: true, message: 'Please input invite phone!' }]}
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

InviteForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onNameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onPhoneChange: PropTypes.func,
  onFinish: PropTypes.func,
}

export default InviteForm;
