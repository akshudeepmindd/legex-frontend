import React, { Component } from 'react';
import { Row, Col, PageHeader, Descriptions, Button, Tag } from 'antd';

class Case extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
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
      ],
    };
  }

  render() {
    const { routes } = this.state;
    return (
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <PageHeader
            onBack={() => window.history.back()}
            title="CaseName"
            tags={<Tag color="blue">Running</Tag>}
            subTitle="This is a subtitle"
            breadcrumbs={routes}
            extra={[
              <Button key="2">Suspend case</Button>,
              <Button key="1" type="primary">
                Add Party
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
              <Descriptions.Item label="Creation Time">
                2017-01-10
              </Descriptions.Item>
              <Descriptions.Item label="Effective Time">
                2017-10-10
              </Descriptions.Item>
              <Descriptions.Item label="Remarks">
                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </Col>
      </Row>
    );
  }
}

export default Case;
