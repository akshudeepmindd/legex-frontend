import React, { Component } from 'react';
import { Row, Col, Button, Typography } from 'antd';

import { PageLayout } from '../../layouts';
import { ClientCard } from '../../components';

const { Title, Paragraph } = Typography;

class ClientsList extends Component {
  render() {
    return (
      <PageLayout>
        <Row className="clients-hero">
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <div className="clients-hero-container">
              <Title>Our Clients</Title>
              <Paragraph className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid
                unt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati
                on ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Paragraph>
              <Button type="primary">Join Us</Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>
              <Col>
                <ClientCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    )
  }
}

export default ClientsList;
