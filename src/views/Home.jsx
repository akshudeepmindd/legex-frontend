import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

import { PageLayout } from '../layouts';
import HeroImage from '../assets/images/spiraltwo.png';

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <PageLayout>
      <Row justify="center" align="middle" className="home-hero">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="home-hero-container">
            <Title>Online Dispute Resolution</Title>

            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi qui
              iure modi. Qui ess temporibus porro quia suscipit eius ab
              accusantium repellat sint a incidunt iure, qu laborum eveniet
              excepturi.
            </Paragraph>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                <Button type="primary">How it works</Button>
              </Col>
              <Col>
                <Button>Get started</Button>
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
}

export default Home;
