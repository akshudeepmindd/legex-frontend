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
      render: (data) => (
        <Link to={`/dashboard/cases/${data._id}`}>{data.title}</Link>
      ),
    },
    {
      title: 'description',
      key: 'description',
      dataIndex: 'description',
      render: (description) => <Text>{description}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'caseType',
      key: 'type',
      render: (caseType) => <>{caseType.name}</>,
    },
    {
      title: 'Hearings',
      dataIndex: 'hearings',
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
      key: 'status',
      render: (status) => (
        <Tag color="blue" key={status}>
          {status}
        </Tag>
      ),
    },
  ]);

  return <Table columns={columns} dataSource={cases} loading={loading} />;
}

CasesTable.propTypes = {
  cases: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
};

export default CasesTable;
