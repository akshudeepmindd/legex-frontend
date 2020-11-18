import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table, Tag, Badge, Typography } from "antd";
import "./tablestyles.css";
import "antd/dist/antd.css";

const { Text } = Typography;

function HearingsTable({ cases }) {
  const columns = [
    {
      title: "Hearing",
      key: "hearing",
      width: 100,
    //   render: () => (

    //   ),
    },
    {
      title: "Date",
      key: "date",
      width: 100,
      dataIndex: "date",
      //render: (description) => <Text>{description}</Text>,
    },
    {
      title: "Time",
      dataIndex: "time",
      width: 100,
      key: "time",
      //render: (caseType) => <>{caseType.name}</>,
    },
    {
      title: "Docs",
      dataIndex: "docs",
      width: 100,
      key: "docs",
    //   render: (hearings) => (
    //     <Badge
    //       count={hearings.length}
    //       style={{ backgroundColor: "#1F40E6" }}
    //       showZero
    //     />
    //   ),
    },
    // {
    //   title: "Parties",
    //   dataIndex: "parties",
    //   width: 100,
    //   key: "parties",
    //   render: (parties) => (
    //     <Badge
    //       count={parties.length}
    //       style={{ backgroundColor: "#1F40E6" }}
    //       showZero
    //     />
    //   ),
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   width: 100,
    //   key: "status",
    //   render: (status) => (
    //     <Tag color="blue" key={status}>
    //       {status}
    //     </Tag>
    //   ),
    // },
  ];

  return (
    <Table  rowClassName={() => "rowClassName1"} columns={columns} dataSource={cases} scroll={{ x: 400, y: 300 }} />
  );
}

// CasesTable.propTypes = {
//   cases: PropTypes.string.isRequired,
// };

export default HearingsTable;
