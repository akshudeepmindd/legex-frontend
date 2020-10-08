import React, { useState } from "react";
import { Row, Col, PageHeader, Descriptions, Button } from "antd";
import { connect } from "react-redux";
import { DashboardLayout } from "../../../layouts";
import {
  deleteOrganization,
  updateOrganization,
  addMember,
  fetchOrganization,
} from "../../../store/actions/organization";
import Modal from "antd/lib/modal/Modal";
import MembersTable from "../../../components/Organization/MembersTable";
import { OrganizationForm, AddMemForm, CasesTable } from "../../../components";
import { useEffect } from "react";

const Organization = ({
  dispatch,
  organization,
  organizationId,
  user,
  history,
}) => {
  useEffect(() => {
    dispatch(fetchOrganization(organizationId));
  }, [organizationId, dispatch]);

  const handleDelete = async () => {
    if (await dispatch(deleteOrganization(organizationId)))
      history.push("/dashboard/organizations");
  };
  const renderMembers = () => (
    <MembersTable
      members={organization.members}
      owner={organization.owner}
      user={user._id}
      organizationId={organizationId}
    />
  );

  const renderCases = () => <CasesTable cases={organization.cases} />;

  const [updateOrganizationModal, setUpdateOrganizationModal] = useState(false);
  const [addMemberModalVisibility, setAddMemberModalVisibilty] = useState(
    false
  );

  const onUpdateFinish = async (values) =>
    await dispatch(
      updateOrganization({
        organizationId,
        data: values,
      })
    );

  const onAddFinish = async (values) =>
    (await dispatch(
      addMember({
        organizationId,
        data: values,
      })
    )) && setAddMemberModalVisibilty(false);

  function Conditionally() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Button onClick={() => setAddMemberModalVisibilty(true)}>
            Add Members
          </Button>
          <Button key="2" type="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            key="1"
            type="primary"
            onClick={() => setUpdateOrganizationModal(true)}
          >
            Update
          </Button>
        </>
      );
    }
    return <></>;
  }

  function MemberTableButtons() {
    if (organization.owner._id === localStorage.getItem("user-id")) {
      return (
        <>
          <Button
            onClick={() => setAddMemberModalVisibilty(true)}
            type="primary"
          >
            Add Member
          </Button>
        </>
      );
    }
    return <></>;
  }

  function CasesTableButtons() {
    if (organization.owner._id === localStorage.getItem("user-id")) {
      return (
        <>
          <Button key="3" type="primary">
            Invitations
          </Button>
          <Button key="2" type="primary">
            New Case
          </Button>
        </>
      );
    }
    return <></>;
  }

  return (
    <>
      {organization && user ? (
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
                    extra={[<Conditionally />]}
                  >
                    <Descriptions size="small" column={3}>
                      <Descriptions.Item label="Domain">
                        <a href={organization.domain}>{organization.domain}</a>
                      </Descriptions.Item>
                      <Descriptions.Item label="Creation Time">
                        {new Date(organization.createdAt).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Owner">
                        {
                          /* {new Date(organization.updatedAt).toLocaleDateString()} */
                          organization.owner.email
                        }
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <PageHeader
              ghost={false}
              //onBack={() => window.history.back()}
              title="Members"
              subTitle="All Member's"
              extra={[<MemberTableButtons />]}
            >
              {renderMembers()}
            </PageHeader>
          </Row>

          <Row>
            <PageHeader
              ghost={false}
              //onBack={() => window.history.back()}
              title="Cases"
              subTitle="All Cases"
              extra={[<CasesTableButtons />]}
            >
              {renderCases()}
            </PageHeader>
          </Row>

          <Modal
            title="Organization Form"
            visible={updateOrganizationModal}
            onCancel={() => setUpdateOrganizationModal(false)}
            destroyOnClose={true}
            footer={null}
          >
            <OrganizationForm
              onFinish={onUpdateFinish}
              name={organization.name}
              domain={organization.domain}
            />
          </Modal>

          <Modal
            title="Add Member"
            visible={addMemberModalVisibility}
            onCancel={() => setAddMemberModalVisibilty(false)}
            footer={null}
            destroyOnClose={true}
          >
            <AddMemForm onFinish={onAddFinish} />
          </Modal>
        </DashboardLayout>
      ) : (
        "loading..."
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  organization: state.organization,
  user: state.users.user,
  organizationId: ownProps.match.params.organizationId,
  history: ownProps.history,
});

export default connect(mapStateToProps)(Organization);
