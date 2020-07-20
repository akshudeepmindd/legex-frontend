import React, { useState, useEffect } from 'react';
import { Row, Col, PageHeader, Modal, Button } from 'antd';
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

function OrganizationsList({ dispatch, loading, organizations }) {
  const [routes] = useState([
    {
      path: '/dashboard/overview',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/dashboard/organizations',
      breadcrumbName: 'Organizations',
    },
  ]);

  const [view, setView] = useState(false);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  function showModal() {
    setModal(true);
  }

  function handleOk() {
    setModal(false);
  }

  function handleCancel() {
    setModal(false);
  }

  function toggleView() {
    setView(!view);
  }

  function onFinish(values) {}

  function handleChange() {}

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
            breadcrumbs={routes}
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

      {view ? (
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <OrganizationCard />
          </Col>
        </Row>
      ) : (
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <OrganizationsTable organizations={organizations} />
          </Col>
        </Row>
      )}

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
}

const mapStateToProps = (state) => ({
  loading: state.organizations.loading,
  organizations: state.organizations.organizations,
  error: state.organizations.error,
});

OrganizationsTable.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.boolean,
  error: PropTypes.instanceOf(Object),
  organizations: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps)(OrganizationsList);
