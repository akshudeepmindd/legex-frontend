import React, { Component } from 'react';
import { Layout } from 'antd';

import { Navbar } from '../components';

const { Header, Content, Footer } = Layout;


export class PageLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date().getFullYear(),
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="page-layout-header">
          <Navbar/>
        </Header>
        <Content className="page-layout-content">
          {this.props.children};
        </Content>
        <Footer>
          <b>Legex ODR</b> &copy; {this.state.date}. A &nbsp;.
          <a href="https://www.legex.in/">Legex</a> product.
        </Footer>
      </Layout>
    )
  }
}

export default PageLayout
