import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

import { PageLayout } from '../layouts';
import HeroImage from '../assets/images/spiraltwo.png';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <PageLayout>
      <Row
        justify="space-between"
        align="middle"
        className="hero"
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div className="hero-container">
            <Title>Online Dispute Resolution</Title>

            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi qui
              iure modi. Qui ess temporibus porro quia suscipit eius ab
              accusantium repellat sint a incidunt iure, qu laborum eveniet
              excepturi.
            </Paragraph>

            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Button type="primary" block>
                  How it works
                </Button>
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Button block>Get started</Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <img src={HeroImage} alt="spiral" className="home-hero-image" />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default Home;
