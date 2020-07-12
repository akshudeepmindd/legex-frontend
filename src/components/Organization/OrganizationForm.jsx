import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

function OrganizationForm(props) {
  const { onFinish, handleChange, name, domain } = props;
  return (
    <Form name="OrganizationForm" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: 'Please input the organization name!' },
        ]}
      >
        <Input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item name="domain">
        <Input
          type="text"
          placeholder="domain"
          value={domain}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

OrganizationForm.propTypes = {
  name: PropTypes.string.isRequired,
  domain: PropTypes.string,
  handleChange: PropTypes.func,
  onFinish: PropTypes.func,
};

export default OrganizationForm;
