import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';

function CaseForm(props) {
  const { onFinish, handleChange, title, description } = props;
  return (
    <Form name="CaseForm" onFinish={onFinish}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the case title!' }]}
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[
          { required: true, message: 'Please input the case description!' },
        ]}
      >
        <Input.TextArea
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="case_type"
        rules={[{ required: true, message: 'Please input the case type!' }]}
      >
        <Select>
          <Select.Option value="option">option</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

CaseForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default CaseForm;
