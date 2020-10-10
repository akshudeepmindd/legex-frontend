import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// ant design components
import {
  Row,
  Col,
  Card,
  Avatar,
  Form,
  Select,
  Comment,
  List,
  Button,
  Typography,
  Modal,
  Empty,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

// components
import { DashboardLayout } from "../../layouts";
import { CasesTable, ProfileForm } from "../../components";

const { Text } = Typography;
const { Meta } = Card;
const { Option } = Select;

const Overview = ({ user, cases, casesLoading, organizations, messages }) => {
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [profileModal, setProfileModal] = useState(false);

  const toggleModal = () => {
    setProfileModal(true);
  };
  const handleOk = (e) => {
    setProfileModal(false);
  };

  const handleCancel = (e) => {
    setProfileModal(false);
  };

  const renderCasesTable = () => {
    return (
      <CasesTable
        cases={cases}
        loading={casesLoading}
        scroll={{
          y: 300,
          x: "100vw",
        }}
      />
    );
  };

  const renderUserProfile = () => {
    if (user.hasOwnProperty("firstName")) {
      return (
        <Card
          bordered={false}
          actions={[
            <Button
              type="primary"
              icon={<EditOutlined />}
              block
              onClick={toggleModal}
            >
              Edit Profile
            </Button>,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="avatar-placeholder"
                shape="square"
              />
            }
            title={`${user.firstName} ${user.lastName}`}
            description={[<Text>{user.email}</Text>, <Text>{user.phone}</Text>]}
          />
        </Card>
      );
    }
    return (
      <Card title="User Profile">
        <Empty />
      </Card>
    );
  };

  const renderOrganizationMembers = () => {
    selectedOrganization.map((member) => (
      <Card bordered={false}>
        <Meta
          avatar={
            <Avatar
              size={64}
              icon={<UserOutlined />}
              className="avatar-placeholder"
              shape="square"
            />
          }
          title={member.firstName}
          description={[
            <Text>{member.email}</Text>,
            <Text>{member.phone}</Text>,
          ]}
        />
      </Card>
    ));
  };

  const organizationOptions = (organizations) =>
    organizations.map((organization) => (
      <Option key={organization._id}>{organization.name}</Option>
    ));

  const selectOrganization = (value) => {
    const selected = organizations.filter(
      (organization) => organization._id === value
    );
    setSelectedOrganization(selected[0].members);
  };

  return (
    <DashboardLayout>
      {organizations && user ? (
        <>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
            justify="center"
            align="top"
          >
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              {renderUserProfile()}
            </Col>

            <Col xs={24} sm={24} md={6} lg={6} xl={6} />

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card bordered={false} title="My Organizations">
                <Form>
                  <Form.Item>
                    <Select onChange={selectOrganization}>
                      {organizationOptions}
                    </Select>
                  </Form.Item>
                  {renderOrganizationMembers()}
                </Form>
              </Card>
            </Col>
          </Row>

          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <Card title="All Cases">{renderCasesTable()}</Card>
            </Col>
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <Card bordered={false} title="Messages">
                <List
                  className="comment-list"
                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={(message) => (
                    <li>
                      <Comment
                        actions={message.actions}
                        author={message.author}
                        avatar={message.avatar}
                        content={message.content}
                        datetime={message.datetime}
                      />
                    </li>
                  )}
                />
              </Card>
            </Col>
          </Row>

          <Modal
            title="Edit Profile"
            visible={profileModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ProfileForm />
          </Modal>
        </>
      ) : (
        "loading..."
      )}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cases: state.cases.cases,
  casesLoading: state.cases.loading,
  caseErrors: state.cases.error,
  organizations: state.organizations,
});

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object),
  cases: PropTypes.instanceOf(Array),
  organizations: PropTypes.instanceOf(Array),
  messages: PropTypes.instanceOf(Array),
  casesLoading: PropTypes.bool.isRequired,
  organizationsLoading: PropTypes.bool.isRequired,
};

Overview.defaultProps = {
  user: {},
  cases: [],
  organizations: [],
  messages: [],
};

export default connect(mapStateToProps)(Overview);
