import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

function ForgotPasswordForm(props) {
  const { onFinish, handleChange, email } = props;
  return (
    <Form name="ForgotPassword" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Send password reset link
        </Button>
      </Form.Item>
    </Form>
  );
}

ForgotPasswordForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default ForgotPasswordForm;
