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
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { DashboardLayout } from "../../../layouts";
import {
  fetchOrganization,
  deleteOrganization,
  updateOrganization,
  addMember,
} from "../../../store/actions/organizations";
import Modal from "antd/lib/modal/Modal";
//import CasesTable from "../../../components/Organization/CasesTable";
import MembersTable from "../../../components/Organization/MembersTable";
import { OrganizationForm, AddMemForm, CasesTable } from "../../../components";

const { Meta } = Card;
const { Paragraph } = Typography;

const Organization = ({ dispatch }) => {
  const { organizationId } = useParams();
  const [email, updateEmail] = useState("");

  const organization = useSelector(
    (state) =>
      state.organizations.organizations.filter(
        (organization) => organization._id === organizationId
      )[0]
  );
  //console.log(organization);
  //console.log(organization.members);
  console.log(organization);
  //useEffect(() => console.log(organization), [organization]);

  const handleDelete = async () => {
    const response = await dispatch(deleteOrganization(organizationId));
    if (response.status) {
      window.location.replace("/dashboard/organizations");
    } else {
      message.error(response.message);
    }
  };

  const renderMembers = () => {
    return <MembersTable members={organization.members} />;
  };

  const renderCases = () => {
    return <CasesTable cases={organization.cases}/>;
  };

  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const showUpdateModal = () => {
    setUpdateModal(true);
  };

  const showAddModal = () => {
    setAddModal(true);
  };
  const handleOk = () => {
    setUpdateModal(false);
    setAddModal(false);
  };

  const handleCancel = () => {
    setUpdateModal(false);
    setAddModal(false);
  };

  const handleUpdateClick = () => {
    showUpdateModal();
  };

  const handleAddClick = () => {
    showAddModal();
  };

  const onUpdateFinish = async (values) => {
    const response = await dispatch(
      updateOrganization({
        organizationId,
        data: values,
      })
    );
    setUpdateModal(false);
    if (!response.success) message.error(response.message);
  };

  const onAddFinish = async (values) => {
    const response = await dispatch(
      addMember({
        organizationId,
        data: values,
      })
    );
    setAddModal(false);
    if (response.success) {
      updateEmail("");
    } else {
      message.error(response.message);
    }
  };
  // const onAddFinish = {};

  return (
    <>
      {organization ? (
        <DashboardLayout>
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
                      <Button onClick={handleAddClick}>Add Members</Button>,
                      <Button key="2" type="danger" onClick={handleDelete}>
                        Delete
                      </Button>,
                      <Button
                        key="1"
                        type="primary"
                        onClick={handleUpdateClick}
                      >
                        Update
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

          {renderMembers()}
          {renderCases()}
          <Modal
            title="Organization Form"
            visible={updateModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <OrganizationForm
              onFinish={onUpdateFinish}
              name={organization.name}
              domain={organization.domain}
            />
          </Modal>

          <Modal
            title="Add Member"
            visible={addModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <AddMemForm onFinish={onAddFinish} email={email} />
          </Modal>
        </DashboardLayout>
      ) : null}
    </>
  );
};

Organization.propTypes = {
  dispatch: PropTypes.func.isRequired,
  organization: PropTypes.instanceOf(Array).isRequired,
};

export default Organization;
