import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import { Navbar } from '../components';

const { Header, Content, Footer } = Layout;

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
    }
  }

  render() {
    return (
      <Layout>
        <Header>
          <Navbar/>
        </Header>
        <Content className="auth-layout-content">
          <Row justify="center" align="middle" className="auth-layout-row">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>{this.props.children}</Col>
            <Col xs={0} sm={0} md={12} lg={16} xl={16}></Col>
          </Row>
        </Content>
        <Footer>
          <b>Legex ODR</b> &copy; {this.state.year}. A &nbsp;.
          <a href="https://www.legex.in/">Legex</a> product.
        </Footer>
      </Layout>
    )
  }
}

export default AuthLayout
