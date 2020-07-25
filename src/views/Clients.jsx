import React from 'react';
import { Row, Col, Typography, Card } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

const Clients = () => {
  const renderClients = () => {
    return (
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card bordered={false} />
      </Col>
    );
  };
  return (
    <PageLayout>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        className="clients-row"
      >
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Title>Our Clients</Title>
          <Paragraph>Lorem</Paragraph>
        </Col>

        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
            className="clients-row"
          >
            {renderClients()}
          </Row>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default Clients;
