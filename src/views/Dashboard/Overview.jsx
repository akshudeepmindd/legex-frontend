import React, { useState } from 'react';
import { Row, Col, PageHeader, Card, Statistic, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { DashboardLayout } from '../../layouts';
import { CasesTable } from '../../components';

function Overview() {
  const [routes] = useState([
    {
      path: '/dashboard/overview',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/dashboard/overview',
      breadcrumbName: 'Overview',
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
            title="Overview"
            subTitle="An overview of the current state"
            breadcrumbs={routes}
          />
        </Col>
      </Row>

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card>
                <Statistic title="Cases" value={100} suffix="+" />
              </Card>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card>
                <Statistic title="Organizations" value={100} suffix="+" />
              </Card>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card>
                <Statistic title="Documents" value={100} suffix="+" />
              </Card>
            </Col>
          </Row>

          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card title="All Cases">
                <CasesTable />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card bordered={false}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default Overview;
