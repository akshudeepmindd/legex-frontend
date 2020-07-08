import React, { Component } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Sidebar } from '../components';

const { Header, Sider, Content, Footer } = Layout;

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      year: new Date().getFullYear(),
    };
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">LEGEX</div>
          <Sidebar/>
        </Sider>
        <Layout className="dashboard-layout">
          <Header className="dashboard-layout-header">
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              onClick: this.toggle,
            })}
          </Header>
          <Content className="dashboard-layout-content">
            {this.props.children}
          </Content>
          <Footer className="dashboard-layout-footer">
            <b>Legex ODR</b> &copy; {this.state.year}. A &nbsp;
            <Link href="https://www.legex.in/">Legex</Link> product.
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default DashboardLayout;
