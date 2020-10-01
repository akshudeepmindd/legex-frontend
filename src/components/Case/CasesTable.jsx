import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Tag, Badge, Typography } from 'antd';

const { Text } = Typography;

function CasesTable(props) {
  const { cases, loading } = props;
  const [columns] = useState([
    {
      title: 'Title',
      key: 'title',
      width: 100,
      render: (data) => (
        <Link to={`/dashboard/cases/${data._id}`}>{data.title}</Link>
      ),
    },
    {
      title: 'description',
      key: 'description',
      width: 100,
      dataIndex: 'description',
      render: (description) => <Text>{description}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'caseType',
      width: 100,
      key: 'type',
      render: (caseType) => <>{caseType.name}</>,
    },
    {
      title: 'Hearings',
      dataIndex: 'hearings',
      width: 100,
      key: 'hearings',
      render: (hearings) => (
        <Badge
          count={hearings.length}
          style={{ backgroundColor: '#1F40E6' }}
          showZero
        />
      ),
    },
    {
      title: 'Parties',
      dataIndex: 'parties',
      width: 100,
      key: 'parties',
      render: (parties) => (
        <Badge
          count={parties.length}
          style={{ backgroundColor: '#1F40E6' }}
          showZero
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      key: 'status',
      render: (status) => (
        <Tag color="blue" key={status}>
          {status}
        </Tag>
      ),
    },
  ]);



  return <Table columns={columns} dataSource={cases} loading={loading} scroll={{x: 700, y:300}}/>;
}

CasesTable.propTypes = {
  cases: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
};

export default CasesTable;
