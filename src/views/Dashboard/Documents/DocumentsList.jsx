import React, { Component } from 'react';
import { Row, Col, PageHeader } from 'antd';

import { DashboardLayout } from '../../../layouts';

class DocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/dashboard/overview',
          breadcrumbName: 'Dashboard',
        },
        {
          path: '/dashboard/documents',
          breadcrumbName: 'Documents',
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
              title="Documents"
              subTitle="Manage all your document uploads"
              breadcrumb={routes}
            />
          </Col>
        </Row>
      </DashboardLayout>
    );
  }
}

export default DocumentsList;
