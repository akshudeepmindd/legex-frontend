import React, { useEffect, useState } from "react";
import PropTypes, { object } from "prop-types";
import { Table, Space, Button, Badge, Typography, message } from "antd";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
;
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

function CasesTable({ organization }) {
  const columns = [
    {
      title: "Title",
      width:100,
      key: "title",
      //dataIndex:'name',
      render: (c) => (
        <Link to={`/dashboard/organizations/${c._id}`}>
          {c.title}
        </Link>
      ),
    },
    {
      title: "Status",
      width: 100,
      key: "satus",
      dataIndex: "status",
      render: (status) => (
        <Typography.Text className="capitalize">
          {status}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={organization.cases}
      scroll={{ x: 400, y: 300 }}
    />
  );
}

// CasesTable.propTypes = {
//   //organization: PropTypes.arrayOf(object).isRequired,
// };

export default CasesTable;
