import React from 'react';
import {PropTypes, element} from 'prop-types';
import { Layout, Row, Col } from 'antd';

import { Navbar } from "../components";

const { Header, Content } = Layout;

function AuthLayout(props) {
  const { children } = props;
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content className="auth-layout-content">
        <Row justify="center" align="middle" className="auth-layout-row">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
            className="auth-layout-form"
          >
            {children}
          </Col>
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={16}
            xl={16}
            className="auth-layout-image"
          />
        </Row>
      </Content>
    </Layout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.arrayOf(element).isRequired,
};

export default AuthLayout;
