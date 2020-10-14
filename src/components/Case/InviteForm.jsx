import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Radio } from "antd";

function InviteForm(props) {
  const { onFinish } = props;

  const [receiverType, setReceiverType] = useState("User");

  const onReceiverTypeChange = (e) => {
    setReceiverType(e.target.value);
  };

  return (
    <Form name="InviteForm" onFinish={onFinish}>
      <Form.Item
        label="type"
        name="receiverType"
        onChange={onReceiverTypeChange}
      >
        <Radio.Group>
          <Radio.Button value="User">User</Radio.Button>
          <Radio.Button value="Organization">Organization</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {receiverType === "User" ? (
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input invite email!" }]}
        >
          <Input type="email" placeholder="email of the user" />
        </Form.Item>
      ) : (
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input invite name!" }]}
        >
          <Input type="text" placeholder="name of the organization" />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send Invite
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
