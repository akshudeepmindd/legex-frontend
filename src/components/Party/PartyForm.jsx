import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';

class PartyForm extends Component {
  render() {
    return (
      <Form
        name="PartyForm"
        onFinish={this.props.onFinish}
      >
        <Form.Item
          name="role"
        >
          <Select>
            <Select.Option value="mediator">mediator</Select.Option>
            <Select.Option value="arbitrator">arbitrator</Select.Option>
            <Select.Option value="adjudicator">adjudicator</Select.Option>
            <Select.Option value="defendant">defendant</Select.Option>
            <Select.Option value="plaintiff">plaintiff</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button></Button>
        </Form.Item>
      </Form>
    )
  }
}

export default PartyForm;
