import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
// import FormItem from "antd/lib/form/FormItem";

const AddMemForm = ({ onFinish, email }) => {
  return (
    <Form name="AddMemForm" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input the Member Email!" }]}
      >
        <Input type="text" placeholder="email" value={email} />
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
  email: PropTypes.string,
  onFinish: PropTypes.func.isRequired,
};

AddMemForm.defaultProps = {
  email: "",
};

export default AddMemForm;
