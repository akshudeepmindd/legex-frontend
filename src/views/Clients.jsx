import React from 'react';
import { Row, Col, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

function Clients() {
  return (
    <PageLayout>
      <Row>
        <Col>
          <Title>Our Clients</Title>
          <Paragraph>Lorem</Paragraph>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default Clients;
