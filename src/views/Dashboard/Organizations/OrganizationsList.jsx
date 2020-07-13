import React, { Component } from 'react';
import { Row, Col, PageHeader, Button } from 'antd';
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';

import { DashboardLayout } from '../../../layouts';
import { OrganizationCard, OrganizationsTable } from '../../../components';

class OrganizationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/dashboard/overview',
          breadcrumbName: 'Dashboard',
        },
        {
          path: '/dashboard/organizations',
          breadcrumbName: 'Organizations',
        },
      ],
    };
  }

  render() {
    const { routes } = this.state;
    const { organizations } = this.props;
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
              title="Organizations"
              subTitle="Manage all your organizations"
              breadcrumbs={routes}
              extra={[
                <Button key="3" icon={<TableOutlined />} />,
                <Button key="2" icon={<AppstoreOutlined />} />,
                <Button key="1" type="primary">
                  Create new organization
                </Button>,
              ]}
            />
          </Col>
        </Row>

        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <OrganizationCard />
          </Col>
        </Row>

        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <OrganizationsTable organizations={organizations} />
          </Col>
        </Row>
      </DashboardLayout>
    );
  }
}

export default OrganizationsList;
