import React, { Component } from 'react';
import { Table } from 'antd';

class CasesTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Case No.',
          dataIndex: 'number',
          key: 'number',
        }, {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        }, {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        }, {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
      ]
    }
  }

  render() {
    return (
      <Table columns={this.state.columns} />
    )
  }
}

export default CasesTable;
