import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';

import { PageLayout } from '../layouts';

const { Title } = Typography;

class Home extends Component {
  render() {
    return (
      <PageLayout>
        <Row>
          <Col xs={24} sm={24} md={12} lg={8} xl={10}>
            <Title>Online Dispute Resolution</Title>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi qui iure modi. Qui esse
              temporibus porro quia suscipit eius ab accusantium repellat sint a incidunt iure, quo
              laborum eveniet excepturi.
            </p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={16} xl={14}>
            <img src="../assets/images/spiral.png" alt="spiral"/>
          </Col>
        </Row>
      </PageLayout>
    )
  }
}

export default Home;
