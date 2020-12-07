import React, { useState } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
//import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import Logo from "../assets/images/logo.png";
import { Sidebar } from "../components";

const { 
  //Header, 
  Sider, Content, Footer } = Layout;

function DashboardLayout(props) {
  const { children } = props;
  //const [collapsed, setCollapsed] = useState(true);
  const [year] = useState(new Date().getFullYear());

  // function toggle() {
  //   setCollapsed(!collapsed);
  // }

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <img src={Logo} alt="Legex" className="logo"  />
        <Sidebar />
      </Sider>
      <Layout className="dashboard-layout">
        
        <Content className="dashboard-layout-content">{children}</Content>
        <Footer className="dashboard-layout-footer">
          <b>Legex ODR</b> &copy; {year} A &nbsp;
          <a href="https://www.legex.in/">Legex</a> product.
        </Footer>
      </Layout>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default DashboardLayout;
