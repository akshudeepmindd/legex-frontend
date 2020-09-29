import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  PageHeader,
  Descriptions,
  Button,
  Card,
  Avatar,
  Typography,
  message,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { DashboardLayout } from "../../../layouts";
import {
  fetchOrganization,
  deleteOrganization,
  updateOrganization,
} from "../../../store/actions/organizations";
import Modal from "antd/lib/modal/Modal";
import { OrganizationForm } from "../../../components";

const { Meta } = Card;
const { Paragraph } = Typography;

const Organization = ({ dispatch, organization }) => {
  const { organizationId } = useParams();

  useEffect(() => {
    dispatch(fetchOrganization(organizationId));
  }, [dispatch, organizationId]);

  const handleDelete = async () => {
    const response = await dispatch(deleteOrganization(organizationId));
    if (response.status) {
      window.location.replace("/dashboard/organizations");
    } else {
      message.error(response.message);
    }
  };

  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleUpdateClick = () => {
    showModal();
  };

  const onUpdateFinish = async (values) => {
    const response = await dispatch(
      updateOrganization({
        organizationId,
        data: values,
      })
    );
    if (!response.success) message.error(response.message);
  };
  return (
    <DashboardLayout>
      {organization ? (
        <>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Row
                gutter={[
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                ]}
              >
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <PageHeader
                    ghost={false}
                    title={organization.name}
                    extra={[
                      <Button key="2" onClick={handleDelete}>
                        Delete Organization
                      </Button>,
                      <Button
                        key="1"
                        type="primary"
                        onClick={handleUpdateClick}
                      >
                        Update Organization
                      </Button>,
                    ]}
                  >
                    <Descriptions size="small" column={3}>
                      <Descriptions.Item label="Domain">
                        <a href={organization.domain}>{organization.domain}</a>
                      </Descriptions.Item>
                      <Descriptions.Item label="Creation Time">
                        {new Date(organization.createdAt).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Est Time">
                        {new Date(organization.updatedAt).toLocaleDateString()}
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card
                bordered={false}
                actions={[
                  <Button type="primary" icon={<EditOutlined />} block>
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
                  title={`${organization.owner.firstName} ${organization.owner.lastName}`}
                  description={
                    <>
                      <Paragraph>{organization.owner.email}</Paragraph>
                      <Paragraph>{organization.owner.phone}</Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          </Row>
          <Modal
            title="Organization Form"
            visible={modal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <OrganizationForm
              onFinish={onUpdateFinish}
              name={organization.name}
              domain={organization.domain}
            />
          </Modal>
        </>
      ) : null}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  organization: state.organizations.organization,
});

Organization.propTypes = {
  dispatch: PropTypes.func.isRequired,
  organization: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Organization);
