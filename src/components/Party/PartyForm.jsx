import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button } from 'antd';

function PartyForm(props) {
  const { onFinish } = props;
  return (
    <Form name="PartyForm" onFinish={onFinish}>
      <Form.Item name="role">
        <Select>
          <Select.Option value="mediator">mediator</Select.Option>
          <Select.Option value="arbitrator">arbitrator</Select.Option>
          <Select.Option value="adjudicator">adjudicator</Select.Option>
          <Select.Option value="defendant">defendant</Select.Option>
          <Select.Option value="plaintiff">plaintiff</Select.Option>
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

PartyForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default PartyForm;
