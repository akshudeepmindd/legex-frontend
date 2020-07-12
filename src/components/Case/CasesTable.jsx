import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

function CasesTable(props) {
  const { cases } = props;
  const [columns] = useState([
    {
      title: 'Case No.',
      dataIndex: 'number',
      key: 'number',
      render: (number) => <Link to="/case/case">{number}</Link>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="danger" icon={<DeleteOutlined />} />
          <Button type="primary" icon={<EyeOutlined />} />
        </>
      ),
    },
  ]);

  return <Table columns={columns} dataSource={cases} />;
}

CasesTable.propTypes = {
  cases: PropTypes.string.isRequired,
};

export default CasesTable;
