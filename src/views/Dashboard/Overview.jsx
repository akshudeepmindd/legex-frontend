import React, { Component } from 'react';
import { Row, Col, PageHeader, Card, Statistic } from 'antd';

import { DashboardLayout } from '../../layouts';
import { CasesTable } from '../../components';

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
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <PageHeader
              className="dashboard-page-header"
              ghost={false}
              onBack={() => window.history.back()}
              title="Overview"
              subTitle="An overview of the current state"
              breadcrumb={this.state.routes}
            />
          </Col>
        </Row>

        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card>
                  <Statistic
                    title="Cases"
                    value={100}
                    suffix="+"
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card>
                  <Statistic
                    title="Organizations"
                    value={100}
                    suffix="+"
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card>
                  <Statistic
                    title="Documents"
                    value={100}
                    suffix="+"
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card title="All Cases">
                <CasesTable/>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </DashboardLayout>
    )
  }
}

export default Overview;
