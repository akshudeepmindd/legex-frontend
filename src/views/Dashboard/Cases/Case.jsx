import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  PageHeader,
  Descriptions,
  Button,
  Tag,
  Tabs,
  Timeline,
  Steps,
} from 'antd';

import { DashboardLayout } from '../../../layouts';

const { TabPane } = Tabs;
const { Step } = Steps;

function Case(props) {
  const [routes] = useState([
    {
      path: '/dashboard/overview',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/dashboard/cases',
      breadcrumbName: 'Case',
    },
    {
      path: '/dashboard/cases/case',
      breadcrumbName: 'CaseName',
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
            title="CaseName"
            tags={<Tag color="blue">Running</Tag>}
            subTitle="This is a subtitle"
            breadcrumbs={routes}
            extra={[
              <Button key="3">Suspend case</Button>,
              <Button key="2">Give Verdict</Button>,
              <Button key="1" type="primary">
                Add Party
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Created">John Doe</Descriptions.Item>
              <Descriptions.Item label="Creation Time">
                2017-01-10
              </Descriptions.Item>
              <Descriptions.Item label="Effective Time">
                2017-10-10
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                lorem ipsum
              </Descriptions.Item>
              <Descriptions.Item label="Meeting ID">
                lorem ipsum
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </Col>
      </Row>

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Card bordered={false}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <Steps current={1} status="error">
                  <Step title="Finished" description="This is a description" />
                  <Step
                    title="In Process"
                    description="This is a description"
                  />
                  <Step title="Waiting" description="This is a description" />
                </Steps>
              </TabPane>
              <TabPane tab="Parties" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Documents" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card bordered={false} title="Case Time line">
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default Case;
