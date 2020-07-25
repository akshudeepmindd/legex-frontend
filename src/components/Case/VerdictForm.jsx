import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const VerdictForm = ({ onFinish, verdict, handleChange }) => {
  return (
    <Form name="verdictForm" onFinish={onFinish}>
      <Form.Item>
        <TextArea
          rows={4}
          placeholder=""
          value={verdict}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sumbit
        </Button>
      </Form.Item>
    </Form>
  );
};

VerdictForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  verdict: PropTypes.string.isRequired,
};

export default VerdictForm;
