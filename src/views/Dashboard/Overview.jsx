import React, { Component } from 'react';
import { PageHeader } from 'antd';

import { DashboardLayout } from '../../layouts';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/dashboard/overview',
          breadcrumbName: 'Dashboard',
        }, {
          path: '/dashboard/overview',
          breadcrumbName: 'Overview',
        }
      ],
    }
  }
  render() {
    return (
      <DashboardLayout>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Overview"
          subTitle="This is a subtitle"
          breadcrumb={this.state.routes}
        />
      </DashboardLayout>
    )
  }
}

export default Overview;
