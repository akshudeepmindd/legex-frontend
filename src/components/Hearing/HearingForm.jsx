import React from 'react';
import { Form, DatePicker, TimePicker, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const HearingForm = ({ onFinish, startDate, startTime, duration }) => {
  return (
    <Form name="hearingForm" onFinish={onFinish}>
      <Form.Item
        name="startDate"
        rules={[{ required: true, message: 'Please input the start date!' }]}
      >
        <DatePicker
          placeholder="Start Date"
          value={startDate}
          className="full-width-picker"
        />
      </Form.Item>

      <Form.Item
        name="startTime"
        rules={[{ required: true, message: 'Please input the start time!' }]}
      >
        <TimePicker
          placeholder="Start Time"
          value={startTime}
          className="full-width-picker"
        />
      </Form.Item>

      <Form.Item
        name="duration"
        rules={[
          { required: true, message: 'Please input the estimated duration!' },
        ]}
      >
        <Input type="number" placeholder="Duration" value={duration} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

HearingForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  duration: PropTypes.string,
};

HearingForm.defaultProps = {
  startDate: '',
  startTime: '',
  duration: '',
};

export default HearingForm;
