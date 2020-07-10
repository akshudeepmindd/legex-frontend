import React, { Component } from 'react';
import { Row, Col, Button, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title, Paragraph } = Typography;

class Help extends Component {
  render() {
    return (
      <PageLayout>
        <Row justify="center" align="middle" className="help-hero">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="help-hero-container">
              <iframe title="legex" width="100%" height="400"
                src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1">
              </iframe>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="help-hero-container">
              <Paragraph className="text-white">How it works</Paragraph>
              <Title className="text-white">Lorem ipsum dolor sit amer</Title>
              <Paragraph className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid
                unt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita
                on ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </Paragraph>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Button type="primary" block>How it works</Button>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Button block>Get started</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </PageLayout>
    )
  }
}

export default Help;
