import React, { useEffect, useState } from "react";
import PropTypes, { object } from "prop-types";
import { Table, Space, Button, Badge, Typography, message } from "antd";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteMember } from "../../store/actions/organizations";

function MembersTable({ members }) {
  const { organizationId } = useParams()
  const dispatch = useDispatch()

  const handleMemberDelete = async (member) => {
    const response = await dispatch(deleteMember({ organizationId, data: { member } }))
    if (!response.success) return message.error(response.message)
  }

  const columns = [
    {
      title: "First Name",
      width: 100,
      key: "firstName",
      dataIndex: 'firstName',
      render: (firstName) => (
        <Typography.Text className="capitalize">
          {firstName}
        </Typography.Text>
      ),
    },
    {
      title: "Last Name",
      width: 100,
      key: "lastName",
      dataIndex: "lastName",
      render: (lastName) => (
        <Typography.Text className="capitalize">
          {lastName}
        </Typography.Text>
      ),
    },
    {
      title: "Email",
      width: 100,
      key: "email",
      dataIndex: "email",
      render: (email) => (
        <Typography.Text className="capitalize">
          {email}
        </Typography.Text>
      ),
    },
    {
      title: "Actions",
      width: 100,
      key: "action",
      //dataIndex:'action',
      render: (member) => {
        return (
          <Space>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleMemberDelete(member._id)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={members}
      scroll={{ x: 400, y: 300 }}
    />
  );
}

// MembersTable.propTypes = {
//   organization: PropTypes.arrayOf(object).isRequired,
// };

export default MembersTable;
