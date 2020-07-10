import React, { Component } from 'react';
import { Table } from 'antd';

class OgranizationsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: 'Domain',
          dataIndex: 'domain',
          key: 'domain',
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

export default OgranizationsTable;
