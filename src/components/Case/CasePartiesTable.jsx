import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table, Tag, Badge, Typography } from "antd";

const { Text } = Typography;

function CasePartiesTable({parties}) {
  const columns = [
    {
      title: "Party Name",
      key: "name",
      width: 100,
    //   render: () => (

    //   ),
    },
    {
      title: "Type",
      key: "type",
      width: 100,
      dataIndex: "date",
      //render: (description) => <Text>{description}</Text>,
    },
  ];

  return (
    <Table columns={columns} dataSource={parties} scroll={{ x: 200, y: 300 }} />
  );
}

// CasesTable.propTypes = {
//   cases: PropTypes.string.isRequired,
// };

export default CasePartiesTable;
