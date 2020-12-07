import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Radio } from "antd";
//import { LoadingOutlined } from "@ant-design/icons";

function InviteForm(props) {
  const { onFinish } = props;
  const [loading, setLoading] = useState(false);
  const [receiverType, setReceiverType] = useState(null);

  const onReceiverTypeChange = (e) => {
    setReceiverType(e.target.value);
  };
  const onSubmitClick = async (values) => {
    setLoading(true);
    await onFinish(values);
    setLoading(false);
  };

  return (
    <Form name="InviteForm" onFinish={onSubmitClick}>
      <Form.Item
        name="receiverType"
        onChange={onReceiverTypeChange}
        rules={[{ required: true, message: "Select Reciever Type" }]}
      >
        <Radio.Group>
          <Radio.Button value="User">User</Radio.Button>
          <Radio.Button value="Organization">Organization</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {receiverType === "User" && (
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input invite email!" }]}
        >
          <Input type="email" placeholder="email of the user" />
        </Form.Item>
      )}
      {receiverType === "Organization" && (
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input invite name!" }]}
        >
          <Input type="text" placeholder="name of the organization" />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
		      loading={loading}
		  
        >
          {loading ? "Sending" : "Send"}
        </Button>
      </Form.Item>
    </Form>
  );
}

InviteForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default InviteForm;
