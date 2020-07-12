import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

class OrganizationForm extends Component {
  render() {
    return (
      <Form
        name="OrganizationForm"
        onFinish={this.props.onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input the organization name!' }]}
        >
          <Input
            type="text"
            placeholder="name"
            value={this.props.name}
            onChange={this.props.onNameChange}
          />
        </Form.Item>

        <Form.Item
          name="domain"
        >
          <Input
            type="text"
            placeholder="domain"
            value={this.props.domain}
            onChange={this.props.onDomainChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

OrganizationForm.propTypes = {
  name: PropTypes.string.isRequired,
  domain: PropTypes.string,
  onNameChange: PropTypes.func,
  onDomainChange: PropTypes.func,
  onFinish: PropTypes.func,
}

export default OrganizationForm;
