import React from "react";
import PropTypes from "prop-types";
import { Table, Space, Button, Typography } from "antd";

import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { removeMember } from "../../store/actions/organization";

import "./tablestyles.css";
import "antd/dist/antd.css";

function MembersTable({ members, owner, user, organizationId, dispatch }) {
  const handleMemberDelete = (member) =>
    dispatch(removeMember({ organizationId, data: { member } }));

  function Conditionally({ member }) {
    if (member._id !== owner._id && user === owner._id) {
      return (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleMemberDelete(member._id)}
        />
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
    <Table rowClassName={() => "rowClassName1"} columns={columns} dataSource={members} scroll={{ x: 400, y: 600 }} />
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
