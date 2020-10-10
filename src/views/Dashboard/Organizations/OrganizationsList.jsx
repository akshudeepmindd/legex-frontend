import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  PageHeader,
  Modal,
  Button,
  Card,
  Empty,
  Typography,
} from "antd";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";

import { DashboardLayout } from "../../../layouts";
import {
  OrganizationCard,
  OrganizationsTable,
  OrganizationForm,
} from "../../../components";

import { createOrganization } from "../../../store/actions/organizations";

const { Text } = Typography;

const OrganizationsList = ({ dispatch, organizations, user, history }) => {
  const [showGridView, setGridView] = useState(false);
  const [
    createOrganizationModalVisibility,
    setCreateOrganizationModalVisibility,
  ] = useState(false);

  const showCreateOrganizationModal = () =>
    setCreateOrganizationModalVisibility(true);

  const closeCreateOrganizationModal = () =>
    setCreateOrganizationModalVisibility(false);

  const toggleGridView = () => setGridView(!showGridView);

  const onCreateOrganizationFormFinish = async (values) =>
    await dispatch(createOrganization(values));

  const renderOrganizations = () => {
    if (organizations.length > 0) {
      if (showGridView) {
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
      return (
        <OrganizationsTable organizations={organizations} user={user._id} />
      );
    }
    return (
      <Card bordered={false}>
        <Empty description={<Text>No Organizations Found</Text>} />
      </Card>
    );
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
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <PageHeader
                ghost={false}
                onBack={() => history.push("/dashboard/overview")}
                title="Organizations"
                subTitle="Manage all your organizations"
                extra={[
                  <Button
                    key="2"
                    icon={
                      showGridView ? <TableOutlined /> : <AppstoreOutlined />
                    }
                    onClick={toggleGridView}
                  />,
                  <Button
                    className="dashboard-btn-primary dashboard-layout-btn"
                    key="1"
                    type="primary"
                    onClick={showCreateOrganizationModal}
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
            visible={createOrganizationModalVisibility}
            footer={null}
            destroyOnClose={true}
            onCancel={closeCreateOrganizationModal}
          >
            <OrganizationForm onFinish={onCreateOrganizationFormFinish} />
          </Modal>
        </>
      ) : (
        "loading...."
      )}
    </DashboardLayout>
  );
};

const mapStateToProps = (state, ownProps) => ({
  organizations: state.organizations,
  user: state.user,
  history: ownProps.history,
});

export default connect(mapStateToProps)(OrganizationsList);
