import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Col, Row, Select } from "antd";

function UpdatePassword(props) {
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
      // {...formItemLayout}
      //   form={form}
      name="UpdatePassword"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <div className="update-pwd">
        <Row>
          <Col span={4}>
            <Form.Item label="Password" style={{ marginBottom: 0 }} hasFeedback>
              {" "}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="password" className="btn-pword">
              <Input.Password
                type="password"
                placeholder="Enter Current password"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="password2">
              <Input.Password
                type="password"
                placeholder="Enter New password"
                disabled={disabled}
                style={{ marginLeft: "1rem" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="btn-flex">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-reg"
            disabled={disabled}
          >
            Update Password
          </Button>
        </div>
      </div>
    </Form>
  );
}

UpdatePassword.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UpdatePassword;
