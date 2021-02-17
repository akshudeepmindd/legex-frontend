import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";

const OrganizationForm = ({ onFinish, name, domain }) => {
  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState("");
  // const [domain, setDomain] = useState("");
  const onSubmitHandleClick = async (values) => {
    setLoading(true);
    await onFinish(values);
    setLoading(false);
  };
  return (
    <Form name="OrganizationForm" onFinish={onSubmitHandleClick}>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Please input the organization name!" },
        ]}
      >
        <Input type="text" placeholder="name" defaultValue={name} />
      </Form.Item>

      <Form.Item name="domain">
        <Input type="text" placeholder="domain" defaultValue={domain} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

OrganizationForm.propTypes = {
  name: PropTypes.string,
  domain: PropTypes.string,
  onFinish: PropTypes.func.isRequired,
};

OrganizationForm.defaultProps = {
  domain: "",
  name: "",
};

export default OrganizationForm;
