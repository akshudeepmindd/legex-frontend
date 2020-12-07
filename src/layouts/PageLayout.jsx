import React, { useState } from "react";
import PropTypes from "prop-types";
import { Layout, Drawer, Button, Menu } from "antd";

import { useMediaQuery } from "@react-hook/media-query";
import Logo from "../assets/images/logo.png";
import Navbar from "../components/Navbar";
import {
  BarcodeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

function PageLayout(props) {
  const { children } = props;
  const [year] = useState(new Date().getFullYear());
  const [visible, setVisible] = useState(false);
  // const showDrawer = () => {
  //   setVisible(true);
  // };
  const phoneView = useMediaQuery("only screen and (min-width: 770px)");
  const onClose = () => {
    setVisible(false);
  };
  // const [collapsed, setCollapsed] = useState(false);

  // function toggle() {
  //   setCollapsed(!collapsed);
  // }

  return (
    <Layout>
      <Header
        className="page-layout-header"
        style={{ leftMargin: "0px", leftPadding: "0px" }}
      >
        {!phoneView && (
          <span style={{ leftMargin: "0px", leftPadding: "0px" }}>
            <Button
              style={{ leftMargin: "0px", leftPadding: "0px" }}
              type="primary"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {React.createElement(
                !visible ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
          </span>
        )}
        {!phoneView && (
          <span>
            <a href="https://resolve.legex.in/"  target="_blank" rel="noopener noreferrer" >
              <img src={Logo} alt="Legex" className="logo" />
            </a>
          </span>
        )}
        {phoneView && <Navbar />}
      </Header>
      <Layout>
        <Drawer
          placement={"left"}
          closable={true}
          onClose={onClose}
          visible={visible}
          key={"left"}
        >
          <a href="https://resolve.legex.in/"  target="_blank" rel="noopener noreferrer" >
            <img src={Logo} alt="Legex" className="logo" />
          </a>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
           <Menu.SubMenu
              key="sub2"
              icon={<SolutionOutlined />}
              title="About us"
            >
              <Menu.Item key="/how-we-help-you">
                <Link to="/how-we-help-you">How we help you</Link>
              </Menu.Item>
              <Menu.Item key="/our-services">
                <Link to="/our-services">Our services</Link>
              </Menu.Item>
              <Menu.Item key="/our-people">
                <Link to="/our-people">Our people</Link>
              </Menu.Item>
              <Menu.Item key="/our-clients">
                <Link to="/our-clients">Our clients</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="sub4"
              title={
                <span>
                  <BarcodeOutlined />
                  <span>Account</span>
                </span>
              }
            >
              <Menu.Item key="/login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="/register">
                <Link to="/register">Register</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Drawer>

        <Content className="page-layout-content">{children}</Content>
      </Layout>

      <Footer>
        <a href="https://legex.in">
          <b>Legex</b>
        </a>{" "}
        ODR &copy; {year}
      </Footer>
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;
