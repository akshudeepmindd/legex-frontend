import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

function ProfileForm(props) {
  const { onFinish, handleChange, firstName, lastName, email, phone } = props;
  return (
    <Form name="ProfileForm" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          placeholder="First name"
          value={firstName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input
          placeholder="Last name"
          value={lastName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input placeholder="Phone" value={phone} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email" value={email} onChange={handleChange} />
      </Form.Item>
    </Form>
  );
}

ProfileForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileForm;
