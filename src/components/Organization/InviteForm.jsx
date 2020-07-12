import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

function InviteForm(props) {
  const { onFinish, handleChange, name, email, phone } = props;
  return (
    <Form name="InviteForm" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input invite name!' }]}
      >
        <Input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input invite email!' }]}
      >
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input invite phone!' }]}
      >
        <Input
          type="phone"
          placeholder="phone"
          value={phone}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send Invite
        </Button>
      </Form.Item>
    </Form>
  );
}

InviteForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default InviteForm;
