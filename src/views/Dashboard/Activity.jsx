import React, { Component } from 'react';
import { Row, Col, PageHeader, Calendar } from 'antd';

import { DashboardLayout } from '../../layouts';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/dashboard/overview',
          breadcrumbName: 'Dashboard',
        },
        {
          path: '/dashboard/activities',
          breadcrumbName: 'Activities',
        },
      ],
    };
  }

  render() {
    const { routes } = this.state;
    return (
      <DashboardLayout>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title="Activities"
              subTitle="An overview of your schedule"
              breadcrumb={routes}
            />
          </Col>
        </Row>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Calendar />
          </Col>
        </Row>
      </DashboardLayout>
    );
  }
}

export default Activity;
