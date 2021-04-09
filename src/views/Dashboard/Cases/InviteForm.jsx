import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/actions/user";
import { Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

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
      {/* <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input the Member Email!" }]}
      > */}
      <Typeahead
        id="pagination-example"
        style={{
          width: "100%",
        }}
        maxResults={10}
        options={users}
        paginate={false}
        className="type-header-inpute"
        onInputChange={handleChange}
        onChange={handleChange}
        filterBy={["email"]}
        placeholder="Enter Email ID"
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps} style={{ background: "#fff", height: "auto" }}>
            {results.map((result, index) => (
              <>
                <MenuItem
                  option={result.email}
                  position={result._id}
                  style={{ color: "inherit" }}
                >
                  {result.email}
                </MenuItem>
                <br />
              </>
            ))}
          </Menu>
        )}
      />
      {/* </Form.Item> */}
      <Form.Item
        name="receiverType"
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
