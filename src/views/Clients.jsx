import React from 'react';
import { Row, Col, Typography, Card, Button } from 'antd';

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
      <div className="hero">
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
          justify="start"
          align="middle"
          style={{ minHeight: '100vh' }}
        >
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Title>Our Clients</Title>
            <Paragraph>Lorem</Paragraph>
            <Button type="primary">Get Started</Button>
          </Col>

          <Col xs={24} sm={24} md={20} lg={20} xl={20}>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 8, sm: 16, md: 24, lg: 32 },
              ]}
            >
              {renderClients()}
            </Row>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Clients;
