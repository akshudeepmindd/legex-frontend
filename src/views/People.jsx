import React from 'react';
import { Row, Col, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

function People() {
  return (
    <PageLayout>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        className="hero"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Title>Our People</Title>
          <Paragraph>Lorem</Paragraph>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} />
      </Row>
    </PageLayout>
  );
}

export default People;
