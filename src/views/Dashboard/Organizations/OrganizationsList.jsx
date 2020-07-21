import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  PageHeader,
  Modal,
  Button,
  Card,
  Skeleton,
  Avatar,
} from 'antd';
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DashboardLayout } from '../../../layouts';
import {
  OrganizationCard,
  OrganizationsTable,
  OrganizationForm,
} from '../../../components';
import { fetchOrganizations } from '../../../store/actions/organizations';

const { Meta } = Card;

const OrganizationsList = ({ dispatch, loading, organizations }) => {
  const [view, setView] = useState(false);
  const [modal, setModal] = useState(false);
  const [name] = useState('');
  const [domain] = useState('');

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const toggleView = () => {
    setView(!view);
  };

  const onFinish = (values) => {};

  const handleChange = () => {};

  const renderOrganizations = () => {
    if (loading)
      return (
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className="avatar-placeholder"
              />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      );

    if (view)
      return (
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {organizations.map((organization) => (
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <OrganizationCard organization={organization} />
            </Col>
          ))}
        </Row>
      );

    return <OrganizationsTable organizations={organizations} />;
  };

  return (
    <DashboardLayout>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Organizations"
            subTitle="Manage all your organizations"
            extra={[
              <Button
                key="2"
                icon={view ? <TableOutlined /> : <AppstoreOutlined />}
                onClick={toggleView}
              />,
              <Button key="1" type="primary" onClick={showModal}>
                Create new organization
              </Button>,
            ]}
          />
        </Col>
      </Row>

      {renderOrganizations()}

      <Modal
        title="Organization Form"
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <OrganizationForm
          onFinish={onFinish}
          name={name}
          domain={domain}
          handleChange={handleChange}
        />
      </Modal>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.organizations.loading,
  organizations: state.organizations.organizations,
  error: state.organizations.error,
});

OrganizationsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Object),
  organizations: PropTypes.instanceOf(Array),
};

OrganizationsList.defaultProps = {
  error: {},
  organizations: [],
};

export default connect(mapStateToProps)(OrganizationsList);
