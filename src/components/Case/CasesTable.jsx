import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tag, Space, Badge } from 'antd';
import { Link } from 'react-router-dom';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

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
      title: 'Type',
      dataIndex: 'caseType',
      key: 'type',
      render: (caseType) => <>{caseType.name}</>,
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
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button icon={<DeleteOutlined />} />
          <Button icon={<EyeOutlined />} />
        </Space>
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
