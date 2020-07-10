import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import {
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';

class CasesTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Case No.',
          dataIndex: 'number',
          key: 'number',
          render: number => <Link to="/case/case">{number}</Link>,
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
        }, {
          title: 'Actions',
          key: 'action',
          render: (text, record) => (
            <>
              <Button type="danger" icon={<DeleteOutlined />} />
              <Button type="primary" icon={<EyeOutlined />}/>
            </>
          ),
        },
      ]
    }
  }

  render() {
    return (
      <Table columns={this.state.columns} dataSource={this.props.cases} />
    )
  }
}

export default CasesTable;
