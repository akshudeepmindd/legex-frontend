import React from 'react';
import { Row, Col, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

function Services() {
  return (
    <PageLayout>
      <Row className="hero">
        <Col>
          <Title>Our Services</Title>
          <Paragraph>Lorem</Paragraph>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default Services;
