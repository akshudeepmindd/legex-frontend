import React from 'react';
import { Row, Col, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

function People() {
  return (
    <PageLayout>
      <Row>
        <Col>
          <Title>Our People</Title>
          <Paragraph>Lorem</Paragraph>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default People;
