import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Space, Button, Badge, Typography, message } from "antd";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { deleteOrganization } from "../../store/actions/organizations";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

function OrganizationsTable({ organizations, loading }) {
  const dispatch = useDispatch();

  const handleDelete = async (orgId) => {
    const response = await dispatch(deleteOrganization(orgId));
    window.location.reload();

    if (response.status) {
      // window.location.reload();
    } else {
      message.error(response.message);
    }
  };

  const [columns] = useState([
    {
      title: "Name",
      key: "name",
      render: (organization) => (
        <Link to={`/dashboard/organizations/${organization._id}`}>
          {organization.name}
        </Link>
      ),
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "Admin",
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
      key: "action",
      render: (organization, a) => {
        console.log(organization, a);

        return (
          <Space>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(organization._id)}
            />
            <Button icon={<EyeOutlined />} />
          </Space>
        );
      },
    },
  ]);

  return (
    <>
      {organizations ? (
        <Table
          columns={columns.filter((column) => column !== null)}
          dataSource={organizations}
          loading={loading}
        />
      ) : null}
    </>
  );
}

OrganizationsTable.propTypes = {
  organizations: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default OrganizationsTable;
