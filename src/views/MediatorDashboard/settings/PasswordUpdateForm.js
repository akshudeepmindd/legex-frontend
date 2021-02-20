import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Col, Row, Select } from "antd";

function PasswordUpdateForm(props) {
  const {
    onFinish,
    handleChange,
    firstName,
    lastName,
    phone,
    disabled,
  } = props;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      className="form-input"
      {...formItemLayout}
      name="PasswordUpdateForm"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
      hasFeedback
    >
      <Form.Item label="Password" style={{ marginBottom: 0 }} hasFeedback>
        <Form.Item
          name="password"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input.Password
            type="password"
            placeholder="Enter password"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name="password2"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input.Password
            type="password"
            placeholder="Enter password"
            disabled={disabled}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(30% - 8px)",
            margin: "0 8px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="btn-reg"
            disabled={disabled}
          >
            Update Password
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}

PasswordUpdateForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default PasswordUpdateForm;
