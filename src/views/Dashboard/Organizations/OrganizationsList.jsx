import React, { useEffect, useState } from "react";
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
  Dropdown,
  Menu,
  Badge,
  Space,
} from "antd";
import {
  AppstoreOutlined,
  DownOutlined,
  TableOutlined,
} from "@ant-design/icons";

import { DashboardLayout } from "../../../layouts";
import {
  OrganizationCard,
  OrganizationsTable,
  OrganizationForm,
} from "../../../components";

import { createOrganization } from "../../../store/actions/organizations";
import { respondInvite } from "../../../store/actions/invites";

const { Text } = Typography;

const OrganizationsList = ({ dispatch, organizations, user, history }) => {
  const [showGridView, setGridView] = useState(false);
  const [
    createOrganizationModalVisibility,
    setCreateOrganizationModalVisibility,
  ] = useState(false);
  const [invites, setInvites] = useState([]);

  //update cases when user is fetched
  useEffect(() => {
    user &&
      setInvites(
        user.invites.filter(
          (i) => i.invitationType === "Organization" && i.status === "Waiting"
        )
      );
  }, [user]);

  const showCreateOrganizationModal = () =>
    setCreateOrganizationModalVisibility(true);

  const closeCreateOrganizationModal = () =>
    setCreateOrganizationModalVisibility(false);

  const toggleGridView = () => setGridView(!showGridView);

  const onCreateOrganizationFormFinish = async (values) => {
    const res = await dispatch(createOrganization(values));
    if (res) {
      setCreateOrganizationModalVisibility(false);
    }
    return res;
  };

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
              <Col xs={24} sm={24} md={8} lg={8} xl={8} key={organization._id}>
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
  const acceptConfirmation = ({ invite, message }) =>
    Modal.confirm({
      async onOk() {
        await dispatch(
          respondInvite({
            inviteId: invite._id,
            data: {
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
              response: "Declined",
              invite: invite._id,
            },
          })
        );
      },
      content: message,
      cancelText: "Decline",
      okText: "Accept",
    });
  const pendingInvitationsMenu = ({ invites }) => {
    return (
      <Menu>
        {invites.length > 0 ? (
          invites.map((invite) => {
            return (
              <Menu.Item
                key={invite._id}
                onClick={async () => {
                  acceptConfirmation({
                    invite,
                    message: `Do you want to accept ${invite.sender.name}'s invitation ?`,
                  });
                }}
              >
                {invite.sender.name}
              </Menu.Item>
            );
          })
        ) : (
          <Menu.Item>No Pending Invites</Menu.Item>
        )}
      </Menu>
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
            <Col>
              <PageHeader
                ghost={false}
                onBack={() => history.push("/dashboard/overview")}
                title="Organizations"
                subTitle="Manage all your organizations"
                extra={[
                  <Button
                    key="1"
                    icon={
                      showGridView ? <TableOutlined /> : <AppstoreOutlined />
                    }
                    onClick={toggleGridView}
                  />,
                  <Button
                    className="dashboard-btn-primary dashboard-layout-btn"
                    key="2"
                    type="primary"
                    onClick={showCreateOrganizationModal}
                  >
                    Create a new organization
                  </Button>,
                  <Dropdown
                    key="3"
                    overlay={pendingInvitationsMenu({
                      invites,
                    })}
                    trigger={["click"]}
                  >
                    <Button>
                      <Space direction="horizontal">
                        <Badge
                          count={invites.length}
                          overflowCount={9}
                          showZero={false}
                        />
                        Pending Invitations
                        {invites.length > 0 && <DownOutlined />}
                      </Space>
                    </Button>
                  </Dropdown>,
                ]}
              />
            </Col>
          </Row>
          <Card>{renderOrganizations()}</Card>
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
