import React, { useState } from 'react';
import { Row, Col, PageHeader, Calendar } from 'antd';

import { DashboardLayout } from '../../layouts';

function Appointments(props) {
  const [routes] = useState([
    {
      path: '/dashboard/overview',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/dashboard/activities',
      breadcrumbName: 'Activities',
    },
  ]);
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
            title="Appointments"
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

export default Appointments;
