import React, { Component } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

class DocumentsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Doc No.',
          dataIndex: 'number',
          key: 'number',
          render: number => <Link to="/case/case">{number}</Link>,
        }, {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
      ]
    }
  }

  render() {
    return (
      <Table columns={this.state.columns} dataSource={this.props.documents}/>
    )
  }
}

export default DocumentsTable;
