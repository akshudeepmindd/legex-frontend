import React, { useState } from "react";
import Union from "../../../assets/images/Union.png";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  PageHeader,
  Descriptions,
  Button,
  Menu,
  Dropdown,
  Space,
  Badge,
  Modal,
  Popconfirm,
  Card,
  Select,
  Input,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { DashboardLayout } from "../../../layouts";
import {
  deleteOrganization,
  updateOrganization,
  inviteMember,
  leaveOrganization,
  fetchOrganization,
  createCase,
} from "../../../store/actions/organization";
import MembersTable from "../../../components/Organization/MembersTable";
import {
  OrganizationForm,
  AddMemForm,
  CasesTable,
  CaseForm,
} from "../../../components";
import { useEffect } from "react";
import { respondInvite } from "../../../store/actions/invites";
//CSS
import "antd/dist/antd.css";
import "./Organization.css";
import DocumentsTable from "../../../components/Document/DocumentsTable";
import UploadForm from "../../../components/Document/UploadForm";
import { uploadDocument } from "../../../store/actions/documents";
import PLUS from "../../../assets/images/plus.png";
import Delete from "../../../assets/images/delete.png";

import { hearings, documents, updates } from "../../../utils/constants";
import ShimmerEffect from "../../../components/shimmer";
import { removeMember } from "../../../store/actions/organization";


const styles = {
  text: {
    textTransform: "capitalize",
  },
};

const Organization = ({
  dispatch,
  organization,
  organizationId,
  user,
  history,
  caseTypes,
  organizations,
  cases,
  hearings,
}) => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCase, setSelectedCase] = useState("");
  const [selectedHearing, setSelectedHearing] = useState("");
  const [casesmenu, setCasesmenu] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [orgDomain, setOrgDomain] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(fetchOrganization(organizationId));
  }, [organizationId, dispatch]);

  const onChangeOrg = (value) => {
    setSelectedOrg(value);
  };

  const filterOrganization = organizations?.find(
    (item) => item._id === selectedOrg
  );
  let pendingCases = filterOrganization?.cases?.filter(
    (caseee) => caseee.status !== "completion"
  );

  let pendingCasess = organization?.cases?.filter(
    (caseee) => caseee.status !== "completion"
  );

  let resolvedCases = filterOrganization?.cases?.filter(
    (caseee) => caseee.status == "completion"
  );

  let resolvedCasess = organization?.cases?.filter(
    (caseee) => caseee.status == "completion"
  );
  const filterCases = filterOrganization?.cases.find(
    (item) => item._id === selectedCase
  );

  const onChangeCase = (value) => {
    setSelectedCase(value);
  };
  const onChangeHearing = (value) => {
    setSelectedHearing(value);
  };

  console.log(filterCases, "filterOrganization");

  // const [invites, setInvites] = useState([])

  // useEffect(() => {
  // 	organization && setInvites(organization.invites.filter((i) => i.status === "waiting"))
  // }, [organization])

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
  const handleLeave = async () => {
    if (
      await dispatch(
        leaveOrganization({ organizationId, data: { uid: user._id } })
      )
    );
    history.push("/dashboard/organizations");
  };

  const renderCases = () => <CasesTable cases={organization.cases} />;

  const [updateOrganizationModal, setUpdateOrganizationModal] = useState(false);
  const [inviteMemberModalVisibility, setInviteMemberModalVisibilty] = useState(
    false
  );
  const [createCaseModalVisibility, setCreateCaseModalVisibilty] = useState(
    false
  );

  const download = (data) => {
    setTimeout(() => {
      const response = {
        file: data,
      };
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  };

  const handleMemberDelete = (member) =>
  dispatch(removeMember({ organizationId, data: { member } }));

  const onUpdateFinish = async (values) => {
    if (filterOrganization) {
      (await dispatch(
        updateOrganization({
          organizationId: filterOrganization._id,
          data: values,
        })
      )) && setUpdateOrganizationModal(false);
    } else {
      (await dispatch(
        updateOrganization({
          organizationId,
          data: values,
        })
      )) && setUpdateOrganizationModal(false);
    }
  };

  const onInviteMemberFinish = async (values) =>
    (await dispatch(
      inviteMember({
        senderType: "Organization",
        sender: organizationId,
        receiverType: "User",
        invitationType: "Organization",
        ...values,
      })
    )) && setInviteMemberModalVisibilty(false);

  const onCreateCaseFinish = async (values) =>
    (await dispatch(
      createCase({
        createrType: "Organization",
        creater: organization._id,
        ...values,
      })
    )) && setCreateCaseModalVisibilty(false);

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
                    message: `Do you want to accept ${
                      invite.senderType === "User"
                        ? `${invite.sender.firstName} ${invite.sender.lastName}`
                        : invite.sender.name
                    }`,
                  });
                }}
              >
                {invite.sender.name || invite.sender.email}
              </Menu.Item>
            );
          })
        ) : (
          <Menu.Item>No Pending Invites</Menu.Item>
        )}
      </Menu>
    );
  };

  // const renderContentHeader = (column = 2) => (
  //   <Descriptions size="large" column={column}>
  //     <Descriptions.Item label="Domain">
  //       <a href={organization.domain}>{organization.domain}</a>
  //     </Descriptions.Item>
  //     <Descriptions.Item label="Creation Time">
  //       {new Date(organization.createdAt).toLocaleDateString()}
  //     </Descriptions.Item>
  //     <Descriptions.Item label="Owner">
  //       {`${organization.owner.firstName} ${organization.owner.lastName}(${organization.owner.email})`}
  //     </Descriptions.Item>
  //   </Descriptions>
  // );
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false);
  const onDocumentUploadClick = async (formData) => {
    if (filterOrganization) {
      console.log("hello");
      formData.append("creater", filterOrganization._id);
    } else {
      formData.append("creater", organization._id);
    }
    formData.append("createrType", "Organization");
    (await dispatch(uploadDocument(formData))) &&
      setUploadFormVisibility(false);
  };
  const textPopConfirm = "Are you sure to delete this organization?";
  function Conditionally() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Popconfirm
            placement="bottomLeft"
            title={textPopConfirm}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button key="2" type="danger">
              Delete
            </Button>
          </Popconfirm>
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
    return (
      <>
        <Button onClick={handleLeave} type="danger">
          Leave
        </Button>
      </>
    );
  }

  function MemberTableButtons() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Button
            key="2"
            onClick={() => setInviteMemberModalVisibilty(true)}
            type="primary"
          >
            Invite Member
          </Button>
        </>
      );
    }
    return <></>;
  }

  function CasesTableButtons() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Dropdown
            key="3"
            overlay={pendingInvitationsMenu({
              invites: organization.invites,
            })}
            trigger={["click"]}
          >
            <Button>
              <Space direction="horizontal">
                <Badge
                  count={organization.invites.length}
                  overflowCount={9}
                  showZero={false}
                />
                Pending Invitations
                {organization.invites.length > 0 && <DownOutlined />}
              </Space>
            </Button>
          </Dropdown>
          <Button
            key="2"
            type="primary"
            onClick={() => setCreateCaseModalVisibilty(true)}
          >
            New Case
          </Button>
        </>
      );
    }
    return <></>;
  }

  // if (filterOrganization) {
  //   if (filterOrganization?.cases.length > 0) {
  //     setCasesmenu(filterOrganization.cases);
  //   }
  // } else {
  //   if (organization?.cases.length > 0) {
  //     setCasesmenu(organization.cases);
  //   }
  // }
  // console.log(casesmenu, "casesmenu");
  // const dafaultValue = async () =>
  //   await (organizations ? organizations[0].name : "null");

  return (
    <>
      {organization && user ? (
        <DashboardLayout>
          <Modal
            title="Organization Form"
            visible={updateOrganizationModal}
            onCancel={() => setUpdateOrganizationModal(false)}
            destroyOnClose={true}
            footer={null}
          >
            <OrganizationForm
              onFinish={onUpdateFinish}
              name={
                filterOrganization ? filterOrganization.name : organization.name
              }
              domain={
                filterOrganization
                  ? filterOrganization.domain
                  : organization.domain
              }
            />
          </Modal>
          <Modal
            title="Add Member"
            visible={inviteMemberModalVisibility}
            onCancel={() => setInviteMemberModalVisibilty(false)}
            footer={null}
            destroyOnClose={true}
          >
            <AddMemForm onFinish={onInviteMemberFinish} />
          </Modal>
          <Modal
            title="Case Form"
            visible={createCaseModalVisibility}
            onFinish={onCreateCaseFinish}
            onCancel={() => setCreateCaseModalVisibilty(false)}
            destroyOnClose={true}
            footer={null}
          >
            <CaseForm onFinish={onCreateCaseFinish} caseTypes={caseTypes} />
          </Modal>
          <Modal
            title="Upload Document"
            visible={uploadFormVisbility}
            onCancel={() => setUploadFormVisibility(false)}
            footer={null}
            destroyOnClose={true}
          >
            <UploadForm onUpload={onDocumentUploadClick} />
          </Modal>
          <Row>
            <Col flex="1 1 400px">
              <Select
                style={{ width: 200 }}
                placeholder="Select a Organization"
                onChange={onChangeOrg}
              >
                {organizations?.length > 0
                  ? organizations?.map((item, index) => (
                      <Select.Option value={item._id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))
                  : "null"}
              </Select>

              <img
                className="imgplus"
                src={PLUS}
                onClick={() => setUpdateOrganizationModal(true)}
              />

              <div className="address">
                <div className="org-industry">
                  <label>Industry:</label>
                  <span style={styles.text}>
                    {" "}
                    {filterOrganization
                      ? filterOrganization?.domain
                      : organization?.domain}
                  </span>
                </div>
                <div>
                  <label>Owner: </label>
                  <span style={styles.text}>
                    {" "}
                    {filterOrganization
                      ? filterOrganization?.owner.firstName
                      : organization?.owner.firstName}{" "}
                    {filterOrganization
                      ? filterOrganization?.owner.lastName
                      : organization?.owner.lastName}
                  </span>
                </div>
                <div>
                  <label>CIN: </label>
                  <span className=""> U7012PTC2022IN123456</span>
                </div>
              </div>
            </Col>
            <Col flex="1 1 600px">
              {" "}
              <Row className="case-number-row case-row">
                <Col span={8} className="dispute">
                  <p>NO. OF DISPUTES</p>
                  <p>
                    {filterOrganization
                      ? filterOrganization.cases.length
                      : organization?.cases.length}
                  </p>
                </Col>
                <Col span={8} className="resolve">
                  <p>RESOLVED CASES</p>
                  <p>
                    {resolvedCases
                      ? resolvedCases?.length
                      : resolvedCasess?.length}
                  </p>
                </Col>
                <Col span={8} className="pending">
                  <p>PENDING CASES</p>
                  <p>
                    {pendingCases
                      ? pendingCases?.length
                      : pendingCasess?.length}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="listingcontainer">
            <Row gutter={[48, 16]}>
              <Col flex="1 1 400px">
                <Card bordered={false} className="document-container d-contain">
                  <Row
                    className="upcoming"
                    onClick={() => setUploadFormVisibility(true)}
                  >
                    <h4>Documents</h4>
                    <img src={PLUS} alt="plus" />
                    <Link to="#">view all</Link>
                  </Row>
                  {filterOrganization ? (
                    filterOrganization.documents.length > 0 ? (
                      filterOrganization.documents.map((docs) => (
                        <Row>
                          <Col span={12} className="documentText">
                            {docs.name}
                          </Col>
                          <Col span={12} className="download">
                            <Link
                              href={docs.url}
                              onClick={() => download(docs.url)}
                            >
                              Image <img src={Union} alt="download" />
                            </Link>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      "No Documents Found"
                    )
                  ) : organization.documents.length > 0 ? (
                    organization.documents.map((docs) => (
                      <Row>
                        <Col span={12} className="documentText">
                          {docs.name}
                        </Col>
                        <Col span={12} className="download">
                          <Link href={docs.url}  onClick={() => download(docs.url)}>
                            Image <img src={Union} alt="download" />
                          </Link>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <Row>No member Found</Row>
                  )}
                </Card>
              </Col>
              <Col flex="1 1 600px">
                <Card bordered={true} className="upcoming-container d-contain">
                  <Row className="upcoming">
                    <h4>Members</h4>&nbsp;&nbsp;
                    <img
                      src={PLUS}
                      alt="plus"
                      onClick={() =>
                        setInviteMemberModalVisibilty(
                          !inviteMemberModalVisibility
                        )
                      }
                    />
                  </Row>

                  {filterOrganization ? (
                    filterOrganization.members.length > 0 ? (
                      filterOrganization.members.map((member) => (
                        <Row>
                          <Col span={5} className="documentText">
                            {member.firstName} {member.lastName}
                          </Col>
                          <Col span={8} className="council">
                            {member.name}
                          </Col>
                          <Col span={8} className="download mailadd">
                            <Link to="#">{member.email}</Link>
                          </Col>
                          <Col span={3} className="delete">
                            <img src={Delete} alt="delete" onClick={() => handleMemberDelete(member._id)}/>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <Row>No member Found</Row>
                    )
                  ) : organization.members.length > 0 ? (
                    organization.members.map((member) => (
                      <Row>
                        <Col span={5} className="documentText">
                          {member.firstName} {member.lastName}
                        </Col>
                        <Col span={8} className="council">
                          {member.name}
                        </Col>
                        <Col span={8} className="download mailadd">
                          <Link to="#">{member.email}</Link>
                        </Col>
                        <Col span={3} className="delete">
                          <img src={Delete} alt="delete" onClick={() => handleMemberDelete(member._id)}/>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <Row>No member Found</Row>
                  )}

                  <a href="" className="view">
                    View All
                  </a>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="listingcontainer">
            <div className="flexDiv">
              <div className="add-case">
                <h3>
                  Cases <img src={PLUS} alt="plus" style={{ width: 20 }} />
                </h3>

                <Select
                  style={{ width: 200 }}
                  showSearch
                  placeholder="Select a Case"
                  onChange={onChangeCase}
                >
                  {filterOrganization ? (
                    filterOrganization.cases.length > 0 ? (
                      filterOrganization.cases.map((item, index) => (
                        <Select.Option value={item._id} key={index}>
                          {item.title}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option>No Case</Select.Option>
                    )
                  ) : organization.cases.length > 0 ? (
                    organization.cases.map((item, index) => (
                      <Select.Option value={item._id} key={index}>
                        {item.title}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option>No Case</Select.Option>
                  )}
                </Select>

                <Select
                  style={{ width: 200 }}
                  showSearch
                  placeholder="Select a Hearing"
                  onChange={onChangeHearing}
                >
                  {hearings.hearings?.length > 0
                    ? hearings.hearings?.map((item, index) => (
                        <Select.Option value={item._id} key={index}>
                          {item.case.title}
                        </Select.Option>
                      ))
                    : "no hearings avalable"}
                </Select>
              </div>

              <div className="searchInput">
                <Input type="text" placeholder="Search" value="" />
              </div>
            </div>
            <Row gutter={[48, 16]}>
              {filterCases ? (
                <Col span={8}>
                  <Card bordered={false} className="document-container">
                    <div className="review">
                      <div className="d-flex">
                        {filterCases?.members.length > 0
                          ? filterCases?.members.map((item, index) => (
                              <div>
                                {index ? " Vs " : ""} {item.firstName}{" "}
                                {item.lastName}
                              </div>
                            ))
                          : ""}
                        <Button
                          type={
                            filterCases.status == "invitations"
                              ? "default"
                              : "primary"
                          }
                          className={
                            filterCases.status === "invitations"
                              ? "invitation-btn"
                              : filterCases.status === "creation"
                              ? "creation-btn"
                              : "review-btn"
                          }
                          block
                        >
                          {filterCases.status}
                        </Button>
                      </div>

                      <p>{filterCases.caseType.name}</p>
                      <p>Expected Date of Resolve : 8 Jan 2021</p>
                    </div>
                  </Card>
                </Col>
              ) : filterOrganization ? (
                filterOrganization.cases.length > 0 ? (
                  filterOrganization.cases.map((item, index) => (
                    <Col span={8}>
                      <Card bordered={false} className="document-container">
                        <div className="review">
                          <div className="d-flex">
                            {item?.members.length > 0
                              ? item?.members.map((item, index) => (
                                  <div>
                                    {index ? " Vs " : ""} {item.firstName}{" "}
                                    {item.lastName}
                                  </div>
                                ))
                              : ""}
                            <Button
                              type={
                                item.status == "invitations"
                                  ? "default"
                                  : "primary"
                              }
                              className={
                                item.status === "invitations"
                                  ? "invitation-btn"
                                  : item.status === "creation"
                                  ? "creation-btn"
                                  : "review-btn"
                              }
                              block
                            >
                              {item.status}
                            </Button>
                          </div>

                          <p>{item.caseType.name}</p>
                          <p>Expected Date of Resolve : 8 Jan 2021</p>
                        </div>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col span={8}>no case avelable</Col>
                )
              ) : organization.cases.length > 0 ? (
                organization.cases.map((item, index) => (
                  <Col span={8}>
                    <Card bordered={false} className="document-container">
                      <div className="review">
                        <div className="d-flex flex-end">
                          {item?.members.length > 0
                            ? item?.members.map((item, index) => (
                                <span>
                                  {index ? " Vs " : ""} {item.firstName}{" "}
                                  {item.lastName}
                                </span>
                              ))
                            : ""}
                          <Button
                            type={
                              item.status == "invitations"
                                ? "default"
                                : "primary"
                            }
                            className={
                              item.status === "invitations"
                                ? "invitation-btn"
                                : item.status === "creation"
                                ? "creation-btn"
                                : "review-btn"
                            }
                            block
                          >
                            {item.status}
                          </Button>
                        </div>

                        <p>{item.caseType.name}</p>
                        <p>Expected Date of Resolve : 8 Jan 2021</p>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col span={8}>no case avelable</Col>
              )}

              {/* {organization.cases.map((c) => (
                <Col span={8}>
                  <Card bordered={false} className="document-container">
                    <div className="review">
                      <div className="d-flex">
                        vs. Rohit Sharma
                        <Button
                          type={
                            c.status == "invitations" ? "default" : "primary"
                          }
                          className={
                            c.status === "invitations"
                              ? "invitation-btn"
                              : c.status === "creation"
                              ? "creation-btn"
                              : "review-btn"
                          }
                          block
                        >
                          {c.status}
                        </Button>
                      </div>

                      <p>{c.caseType.name}</p>
                      <p>Expected Date of Resolve : 8 Jan 2021</p>
                    </div>
                  </Card>
                </Col>
              ))} */}
            </Row>
          </div>
          <div className=""></div>
        </DashboardLayout>
      ) : (
        <ShimmerEffect />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  organization: state.organization,
  user: state.user,
  organizationId: ownProps.match.params.organizationId,
  history: ownProps.history,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  cases: state.cases,
  hearings: state.hearings,
});

export default connect(mapStateToProps)(Organization);
