import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

function DocumentsTable(props) {
  const { documents } = props;

  const [columns] = useState([
    {
      title: 'Doc No.',
      dataIndex: 'number',
      key: 'number',
      width: 200,
      render: (number) => <Link to="/case/case">{number}</Link>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 200,
      key: 'title',
    },
  ]);

  return <Table columns={columns} dataSource={documents} scroll={{x: 400, y:300}}/>;
}

DocumentsTable.propTypes = {
  documents: PropTypes.array.isRequired,
};

export default DocumentsTable;
