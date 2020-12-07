import React from "react";
import PropTypes from "prop-types";
import { Table, Space, Button, Typography, Popconfirm } from "antd";

import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { removeMember } from "../../store/actions/organization";

import "./tablestyles.css";
import "antd/dist/antd.css";

const textPopConfirm = "Are you sure you want to remove this member?";

function MembersTable({ members, owner, user, organizationId, dispatch }) {
  const handleMemberDelete = (member) =>
    dispatch(removeMember({ organizationId, data: { member } }));

  function Conditionally({ member }) {
    if (member._id !== owner._id && user === owner._id) {
      return (
        <Popconfirm
          placement="right"
          title={textPopConfirm}
          onConfirm={() => {
            handleMemberDelete(member._id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined />}
            //onClick={() => handleMemberDelete(member._id)}
          />
        </Popconfirm>
      );
    }
    return <></>;
  }
  const columns = [
    {
      title: "First Name",
      width: 100,
      key: "firstName",
      dataIndex: "firstName",
      render: (firstName) => (
        <Typography.Text className="capitalize">{firstName}</Typography.Text>
      ),
    },
    {
      title: "Last Name",
      width: 100,
      key: "lastName",
      dataIndex: "lastName",
      render: (lastName) => (
        <Typography.Text className="capitalize">{lastName}</Typography.Text>
      ),
    },
    {
      title: "Email",
      width: 100,
      key: "email",
      dataIndex: "email",
      render: (email) => <Typography.Text>{email}</Typography.Text>,
    },
    {
      title: "Actions",
      width: 100,
      key: "action",
      render: (member) => {
        return (
          <Space>
            <Conditionally member={member} />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowClassName={() => "rowClassName1"}
      columns={columns}
      dataSource={members}
      scroll={{ x: 400, y: 600 }}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  members: ownProps.members,
  user: ownProps.user,
  owner: ownProps.owner,
  organizationId: ownProps.organizationId,
});

MembersTable.propTypes = {
  members: PropTypes.array,
  user: PropTypes.object,
  owner: PropTypes.object,
  organizationId: PropTypes.string,
};

export default connect(mapStateToProps)(MembersTable);
