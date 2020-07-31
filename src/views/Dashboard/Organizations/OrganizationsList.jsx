import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ant design components
import {
  Row,
  Col,
  PageHeader,
  Modal,
  Button,
  Card,
  Empty,
  Typography,
} from 'antd';
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';

// components
import { DashboardLayout } from '../../../layouts';
import {
  OrganizationCard,
  OrganizationsTable,
  OrganizationForm,
} from '../../../components';

// redux actions
import { fetchOrganizations } from '../../../store/actions/organizations';

const { Text } = Typography;

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
    if (organizations.length > 0) {
      if (view) {
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
      }
      return <OrganizationsTable organizations={organizations} />;
    }
    return (
      <Card bordered={false}>
        <Empty description={<Text>No Organizations Found</Text>} />
      </Card>
    );
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
              <Button
                className="dashboard-btn-primary dashboard-layout-btn"
                key="1"
                type="primary"
                onClick={showModal}
              >
                Create a new organization
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
