import React, { Component } from 'react';
import { Row, Col, PageHeader, Statistic, Button } from 'antd';
import {
  AppstoreOutlined,
  TableOutlined,
} from '@ant-design/icons';

import { DashboardLayout } from '../../../layouts';
import { CaseCard, CasesTable, CaseForm } from '../../../components';

class CasesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          path: '/dashboard/overview',
          breadcrumbName: 'Dashboard',
        }, {
          path: '/dashboard/cases',
          breadcrumbName: 'Cases',
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
              ghost={false}
              onBack={() => window.history.back()}
              title="Cases"
              subTitle="Manage all your cases"
              extra={[
                <Button key="3" icon={<TableOutlined/>} />,
                <Button key="2" icon={<AppstoreOutlined/>} />,
                <Button key="1" type="primary">
                  Create new case
                </Button>,
              ]}
            >
              <Row>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                  <Statistic
                    title="Cases"
                    value="100"
                  />
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                  <Statistic
                    title="Active"
                    value={60}
                  />
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                  <Statistic
                    title="Closed"
                    value={30}
                  />
                </Col>
              </Row>
            </PageHeader>
          </Col>
        </Row>

        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <CaseCard/>
          </Col>
        </Row>

        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <CasesTable/>
          </Col>
        </Row>
      </DashboardLayout>
    )
  }
}

export default CasesList;
