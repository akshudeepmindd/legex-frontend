import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input,Button, } from 'antd';

function ProfileForm(props) {
  const { onFinish, handleChange, firstName, lastName, phone } = props;
  
  return (
    <Form name="ProfileForm" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          placeholder="First name"
          defaultValue={firstName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input
          placeholder="Last name"
          defaultValue={lastName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input placeholder="Phone" defaultValue={phone} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: false }]}
      >
        <Input placeholder="If you want to change Password" onChange={handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
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
