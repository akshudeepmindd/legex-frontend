import React, { Component } from 'react';
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

export default OrganizationForm;
