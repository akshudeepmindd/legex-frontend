import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button} from "antd";

const AddMemForm = ({ onFinish }) => {
  return (
    <Form name="AddMemForm" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input the Member Email!" }]}
      >
        <Input type="text" placeholder="email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

AddMemForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default AddMemForm;
