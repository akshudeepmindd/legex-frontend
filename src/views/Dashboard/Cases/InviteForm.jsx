import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/actions/user";

const InviteMember = ({ onFinish, users, handleChange }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmitHandleClick = async (values) => {
    setLoading(true);
    await onFinish(values);
    setLoading(false);
  };
  return (
    <Form name="AddMemForm" onFinish={onSubmitHandleClick}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input the Member Name!" }]}
      >
        <Input type="text" placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input the Member Email!" }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="select one country"
          defaultValue={["china"]}
          onChange={handleChange}
          optionLabelProp="label"
        >
          {users &&
            users?.map((u) => (
              <Select.Option value={u.email}>{u.firstName}</Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="role"
        rules={[
          { required: true, message: "Please input the Member Designation!" },
        ]}
      >
        <Input type="text" placeholder="Role" />
      </Form.Item>

      <Form.Item
        style={{
          textAlign: "end",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Send Invite
        </Button>
      </Form.Item>
    </Form>
  );
};

InviteMember.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default InviteMember;
