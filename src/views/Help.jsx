import React from 'react';
import { Row, Col, Button, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

const Help = () => {
  return (
    <PageLayout>
      <Row
        justify="center"
        align="middle"
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        className="hero"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <iframe
            title="Legex"
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/RBOSP9X7Vqg"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Col>

        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <Title>How We Help You</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incid unt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercita on ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
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
        </Col>
      </Row>
    </PageLayout>
  );
};

export default Help;
