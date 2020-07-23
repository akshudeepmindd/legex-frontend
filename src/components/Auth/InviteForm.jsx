import React from 'react';
import { Form, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const InviteForm = ({ onFinish, firstName, lastName, email, phone }) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <Select>
          <Select.Option value="member">Member</Select.Option>
          <Select.Option value="organization">Organization</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Input value={firstName} placeholder="First Name" />
      </Form.Item>

      <Form.Item>
        <Input value={lastName} placeholder="Last Name" />
      </Form.Item>

      <Form.Item>
        <Input value={email} placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Input value={phone} placeholder="Phone Number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send Invite
        </Button>
      </Form.Item>
    </Form>
  );
};

InviteForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};

InviteForm.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export default InviteForm;
