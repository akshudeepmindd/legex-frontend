import React, { useState } from "react";
import { Layout, Row, Col, Dropdown, Menu, Button, Modal } from "antd";
import PropTypes from "prop-types";
//import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@react-hook/media-query";
import Logo from "../assets/images/logo.png";
import iconbar from "../assets/images/iconbar.png";
import bell from "../assets/images/bell.png";
import avtar from "../assets/images/avtar.png";
import { Sidebar } from "../components";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import User from "../assets/images/useravtar.png";
import User2 from "../assets/images/dropuser.png";
import Dash from "../assets/images/dash.png";
import { withRouter } from "react-router-dom";
import { respondInvite } from "../store/actions/invites";

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
  const dispatch = useDispatch();
  const [year] = useState(new Date().getFullYear());
  const phoneView = useMediaQuery("only screen and (max-width: 768px)");
  const orgInvite = props.user?.Sinvites?.filter(
    (invite) => invite.invitationType == "Organization"
  );
  const caseInvite = props.user?.Sinvites?.filter(
    (invite) => invite.invitationType == "Case"
  );

  const acceptConfirmation = ({ invite, message }) =>
    Modal.confirm({
      async onOk() {
        await dispatch(
          respondInvite({
            inviteId: invite._id,
            data: {
              invitationType: "Case",
              response: "Accepted",
              invite: invite._id,
            },
          })
        );
      },
      async onCancel() {
        await dispatch(
          respondInvite({
            inviteId: invite._id,
            data: {
              resp: "Declined",
              invite: invite._id,
            },
          })
        );
      },
      content: message,
      cancelText: "Decline",
      okText: "Accept",
    });

  function toggle() {
    setCollapsed(!collapsed);
  }
  function logout() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAdmin");
    props.history.push("/login");
  }
  const userDetail = (
    <Menu style={{ width: 250 }}>
      <Menu.Item style={{ width: 100 }}>
        <div className="user-dropdown">
          <img src={User} height={50} width={50} />
          <span>
            {props.user?.firstName}&nbsp;
            {props.user?.lastName}
          </span>
        </div>
        <div className="logged-container">
          <div className="logged-in">
            <p>Logged In as:</p>
            <p>
              <img src={User2} height={20} width={20} />
              <span>{props.user?.email}</span>
            </p>
            <p>
              <img src={Dash} height={20} width={20} />
              <span>Dashboard</span>
            </p>
          </div>
          <div>
            <Button className="logout-btn" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const notification = (
    <Menu style={{ width: 350 }}>
      <Menu.Item style={{ width: 100 }}>
        <div className="notification-dropdown">
          <img src={bell} alt="bar" className="bel" width={30} height={30} />
          <span>Pending Invitations</span>
        </div>
        <div className="invite-container">
          <div className="invitation">
            <p>Case Invitations</p>
            {caseInvite?.length > 0 ? (
              props.user?.Sinvites?.map((invite) => {
                if (
                  invite.invitationType == "Case" &&
                  invite.status === "Waiting"
                ) {
                  return (
                    <div className="invitation-list">
                      <p>{invite.case}</p>
                      <div
                        style={{
                          textAlign: "end",
                          marginTop: 3,
                        }}
                      >
                        {console.log(invite, "invite")}
                        <Button
                          className="accept-btn"
                          onClick={() =>
                            acceptConfirmation({
                              invite,
                              message: `Do you want to accept invitation to case ?`,
                            })
                          }
                        >
                          Accept
                        </Button>
                        <Button className="cancel-btn">Decline</Button>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <p>No Invitation Available</p>
            )}
          </div>
          <div>
            <div className="invitation">
              <p>Organisation Invitations</p>
              {orgInvite?.length > 0 ? (
                props.user?.Sinvites?.map((invite) => {
                  if (
                    invite.invitationType == "Organization" &&
                    invite.status === "Waiting"
                  ) {
                    return (
                      <div className="invitation-list">
                        <p>{invite.case}</p>
                        <div
                          style={{
                            textAlign: "end",
                            marginTop: 3,
                          }}
                        >
                          <Button className="accept-btn">Accept</Button>
                          <Button className="cancel-btn">Decline</Button>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p>No Invitation Available</p>
              )}
            </div>
            {/* <div></div> */}
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      {phoneView && (
        <Sider breakpoint="lg" collapsedWidth="0">
          <img src={Logo} alt="Legex" className="logo" />
          <Sidebar collapsed={collapsed} />
        </Sider>
      )}
      {!phoneView && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <img src={Logo} alt="Legex" className="logo" />
          <Sidebar collapsed={collapsed} />
        </Sider>
      )}

      <Layout className="dashboard-layout">
        {!phoneView && (
          <Header className="dashboard-layout-header">
            {/* {React.createElement(
              collapsed ? <img src={iconbar} alt='bar' /> : MenuFoldOutlined,
              {
                onClick: toggle,
              }
            )} */}
            <Row>
              <Col span={8}>
                <img src={iconbar} alt="bar" onClick={toggle} />
              </Col>
              <Col span={8} offset={8} className="iconContainer">
                <Dropdown overlay={notification} placement="bottomRight" arrow>
                  <img src={bell} alt="bar" className="bel" />
                </Dropdown>
                <Dropdown overlay={userDetail} placement="bottomLeft" arrow>
                  <img src={avtar} alt="bar" className="avatar" />
                </Dropdown>
                <span>
                  {props.user?.firstName} {props.user?.lastName}
                </span>
              </Col>
            </Row>
          </Header>
        )}
        <Content className="dashboard-layout-content">{children}</Content>
        <Footer className="dashboard-layout-footer">
          <b>Legex ODR</b> &copy; {year} A &nbsp;
          <a href="https://www.legex.in/">Legex</a> product.
        </Footer>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default withRouter(connect(mapStateToProps)(DashboardLayout));
