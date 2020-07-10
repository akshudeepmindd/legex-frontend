import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';

class CaseForm extends Component {
  render() {
    return (
      <Form
        name="CaseForm"
        onFinish={this.props.onFinish}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input the case title!' }]}
        >
          <Input
            type="text"
            placeholder="Title"
            value={this.props.title}
            onChange={this.props.onTitleChange}
          />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Please input the case description!' }]}
        >
          <Input.TextArea
            placeholder="Description"
            value={this.props.description}
            onChange={this.props.onDescriptionChange}
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
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

CaseForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default CaseForm;
