import React, { useState } from "react";
import { PropTypes, element } from "prop-types";
import { Layout, Row, Col, Button, Drawer, Menu } from "antd";
import { useMediaQuery } from "@react-hook/media-query";
import { Navbar } from "../components";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import {
  BarcodeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  //SolutionOutlined,
} from "@ant-design/icons";
const { Header, Content } = Layout;

function AuthLayout(props) {
  const { children } = props;
  const phoneView = useMediaQuery("only screen and (min-width: 770px)");
  const [visible, setVisible] = useState(false);
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
            {/* <Menu.SubMenu
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
            </Menu.SubMenu>*/}

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
      </Layout>
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
