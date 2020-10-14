import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

function ResetPasswordForm(props) {
  const { onFinish, handleChange, password, confirmPassword } = props;
  return (
    <Form name="ResetPassword" onFinish={onFinish}>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="New password"
          value={password}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please input your confirm password!' },
        ]}
      >
        <Input.Password
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}

ResetPasswordForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
