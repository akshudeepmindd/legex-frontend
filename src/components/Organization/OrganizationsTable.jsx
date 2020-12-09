import React from "react";
import PropTypes from "prop-types";
import { Table, Space, Button, Badge, Typography, Popconfirm } from "antd";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { deleteOrganization } from "../../store/actions/organization";
import { DeleteFilled } from "@ant-design/icons";
import "./tablestyles.css";

const textPopConfirm = "Are you sure to delete this organization?";

function OrganizationsTable({ organizations, user, dispatch }) {
  const handleDelete = async (orgId) =>
    await dispatch(deleteOrganization(orgId));

  function Conditionally(organization) {
    if (organization.organization.owner._id === user) {
      return (
        <Popconfirm
          placement="right"
          title={textPopConfirm}
          onConfirm={() => {
            handleDelete(organization.organization._id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteFilled />} />
        </Popconfirm>
      );
    }
    return <></>;
  }
  const columns = [
    {
      title: "Name",
      width: 100,
      key: "name",
      //dataIndex:'name',
      render: (organization) => (
        <Link to={`/dashboard/organizations/${organization._id}`}>
          {organization.name}
        </Link>
      ),
    },
    {
      title: "Domain",
      width: 100,
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "Admin",
      width: 100,
      dataIndex: "owner",
      key: "admin",
      render: (owner) => (
        <Typography.Text className="capitalize">
          {owner.firstName} {owner.lastName}
        </Typography.Text>
      ),
    },
    {
      title: "Members",
      width: 100,
      dataIndex: "members",
      key: "members",
      render: (members) => (
        <Badge
          count={members.length}
          style={{ backgroundColor: "#1F40E6" }}
          showZero
        />
      ),
    },
    {
      title: "Cases",
      width: 100,
      dataIndex: "cases",
      key: "cases",
      render: (cases) => (
        <Badge
          count={cases.length}
          style={{ backgroundColor: "#1F40E6" }}
          showZero
        />
      ),
    },
    {
      title: "Actions",
      width: 100,
      key: "action",
      render: (organization) => {
        return (
          <Space>
            <Conditionally organization={organization} />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      style={{
        minHeight: 500,
      }}
      columns={columns}
      rowClassName={() => "rowClassName1"}
      dataSource={organizations}
      scroll={{ x: 600, y: 600 }}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  organizations: ownProps.organizations,
  user: ownProps.user,
});

OrganizationsTable.propTypes = {
  organizations: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(OrganizationsTable);
