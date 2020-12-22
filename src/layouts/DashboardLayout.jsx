import React, { useState } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
//import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@react-hook/media-query";
import Logo from "../assets/images/logo.png";
import { Sidebar } from "../components";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const {
  //Header,
  Sider,
  Content,
  Footer,
  Header,
} = Layout;

function DashboardLayout(props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const phoneView = useMediaQuery("only screen and (max-width: 768px)");

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout>
      {phoneView && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <img src={Logo} alt="Legex" className="logo" />
          <Sidebar />
        </Sider>
      )}
      {!phoneView && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <img src={Logo} alt="Legex" className="logo" />
          <Sidebar />
        </Sider>
      )}

      <Layout className="dashboard-layout">
        {!phoneView && 
        <Header className="dashboard-layout-header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: toggle,
            }
          )}
        </Header>}
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
