import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

function OrganizationsTable(props) {
  const { organizations } = props;
  const [columns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
  ]);

  return <Table columns={columns} dataSource={organizations} />;
}

OrganizationsTable.propTypes = {
  organizations: PropTypes.array.isRequired,
};

export default OrganizationsTable;
