import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Avatar, Form, Select, Comment, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { DashboardLayout } from '../../layouts';
import { CasesTable } from '../../components';

import { fetchCases } from '../../store/actions/cases';
import { fetchOrganizations } from '../../store/actions/organizations';

const { Meta } = Card;
const { Option } = Select;

const Overview = ({
  dispatch,
  user,
  cases,
  casesLoading,
  organizations,
  organizationsLoading,
  messages,
}) => {
  const [selectedOrganization, setSelectedOrganization] = useState([]);

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const renderCasesTable = () => {
    return <CasesTable cases={cases} loading={casesLoading} />;
  };

  const renderUserProfile = () => {
    return (
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
          title={user.firstName}
          description={
            <>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </>
          }
        />
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
          title={user.firstName}
          description={
            <>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </>
          }
        />
      </Card>
    ));
  };

  const organizationOptions = organizations.map((organization) => (
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
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        justify="center"
        align="top"
      >
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Card>
            <div />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Card>
            <div />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {renderUserProfile()}
        </Col>

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
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  cases: state.cases.cases,
  casesLoading: state.cases.loading,
  caseErrors: state.cases.error,
  organizations: state.organizations.organizations,
  organizationsLoading: state.organizations.loading,
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
