import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Steps, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { MediatorDashboardLayout } from "../../../layouts";

import {
  CaseHeader,
  // InviteForm,
  // HearingForm,
  //   VerdictForm,
} from "../../../components";
import HearingsTable from "../../../components/Hearing/HearingTable";
import CasePartiesTable from "../../../components/Case/CasePartiesTable";

import { fetchCase, inviteParty } from "../../../store/actions/case";
import {
  makeVerdict,
  updateCase,
  updateCse,
} from "../../../store/actions/cases";
import { fetchUser } from "../../../store/actions/user";
import { fetchOrganizations } from "../../../store/actions/organizations";
import UploadForm from "../../../components/Document/UploadForm";
import $http from "../../../utils/api";
import Back from "../../../assets/images/back.png";
import PLUS from "../../../assets/images/plus.png";
import UpdateForm from "./UpdateForm";
import VerdictForm from "./VerdictForm";
import HearingForm from "./hearingForm";
import moment from "moment";
import ShimmerEffect from "../../../components/shimmer";
import { createHearing } from "../../../store/actions/hearings";

const { Step } = Steps;

const MediatorCase = ({
  dispatch,
  caseData,
  user,
  organizations,
  casesData,
  match,
}) => {
  const [hearingModal, setHearingModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);
  const [verdictModal, setVerdictModal] = useState(false);
  const [addCaseModal, setAddCaseModall] = useState(false);
  const [hearingId, sethearingId] = useState(false);
  //store details about how the case is being accessed by the user
  const [access, updateAccess] = useState(null);
  const { caseId } = useParams();
  const history = useHistory();

  //initial data fetch
  useEffect(() => {
    dispatch(fetchCase(caseId));
    dispatch(fetchUser());
    dispatch(fetchOrganizations());
  }, [dispatch, caseId]);
  //find out how the case is being accessed by user
  // This will work if the user is connected to case directly or through a organization
  // but not both
  useEffect(() => {
    if (user && caseData) {
      let type = "Organization";
      let id;
      let access = false;
      for (let i = 0; i < caseData.members.length; i++) {
        if (user._id === caseData.members[i]._id) {
          type = "User";
          break;
        }
      }

      if (type === "User") {
        id = user._id;
        access = true;
      } else
        for (let i = 0; i < caseData.organizations.length; i++) {
          for (let j = 0; j < caseData.organizations[i].members.length; j++) {
            if (caseData.organizations[i].members[j] === user._id) {
              id = caseData.organizations[i]._id;
              if (user._id === caseData.organizations[i].owner) {
                access = true;
              }
              break;
            }
          }
        }
      updateAccess({ type, id, access });
    }
  }, [user, caseData]);

  const updateVerdict = async (value) => {
    let params = {
      _id: match.params.caseId,
      verdict: value.verdict,
    };
    const res = await dispatch(makeVerdict(params));
    setVerdictModal(false);
  };

  const updateC = async (value) => {
    let params = {
      _id: match.params.caseId,
      value: value.update,
    };
    console.log(params);
    await dispatch(updateCase(params));
    setAddCaseModall(false);
  };
  const showInviteModal = () => setInviteModal(true);

  const showVerdictModal = () => setVerdictModal(true);

  const handleOk = (e) =>
    setHearingModal(false) && setInviteModal(false) && setDocumentModal(false);

  const handleCancel = (e) =>
    setHearingModal(false) && setInviteModal(false) && setDocumentModal(false);

  const updateHearing = async (id, values) => {
    console.log(id, "idddd");
    const res = await dispatch(
      createHearing({
        case: match.params.caseId,
        documents: id,
        startDateTime: values.startDateTime,
        remark: values.remark,
      })
    );
    // sethearingId(res?.data?.data)
    let body = {
      _id: match.params.caseId,
      $push: { document: id },
      $push: { hearings: res?._id },
    };
    await dispatch(updateCse(body));
  };

  const onInvitationFormSubmit = async (values) => {
    const res = await dispatch(
      inviteParty({
        senderType: access.type,
        sender: access.id,
        invitationType: "Case",
        case: caseId,
        ...values,
      })
    );
    if (res) {
      setInviteModal(false);
    }
    return res;
  };

  const checkCurrent = () => {
    if (caseData.status === "creation") return 1;
    else if (caseData.status === "invitations") return 2;
    else if (caseData.status === "assignment") return 3;
    else if (caseData.status === "hearings") return 4;
    else return 5;
  };

  console.log(match.params.caseId, "case in case");
  return (
    <MediatorDashboardLayout>
      {caseData ? (
        <>
          <Modal
            title="Send Update"
            visible={addCaseModal}
            onCancel={() => setAddCaseModall(false)}
            destroyOnClose={true}
            footer={null}
          >
            <UpdateForm onFinish={updateC} />
          </Modal>
          <Modal
            title="Verdict"
            visible={verdictModal}
            onCancel={() => setVerdictModal(false)}
            destroyOnClose={true}
            footer={null}
          >
            <VerdictForm onFinish={updateVerdict} />
          </Modal>
          <Modal
            title="Create Hearing"
            visible={hearingModal}
            onCancel={() => setHearingModal(false)}
            destroyOnClose={true}
            footer={null}
          >
            <HearingForm onFinish={updateHearing} />
          </Modal>
          <div className="case-section">
            <div className="address">
              <div className="name">
                <p>
                  <img src={Back} onClick={history.goBack} />
                  {caseData?.members.length > 0
                    ? caseData?.members.map((item, index) => (
                        <span>
                          {index ? " Vs " : ""} {item.firstName} {item.lastName}
                        </span>
                      ))
                    : ""}
                </p>
                <span className="">
                  <a href="">Hearing link</a>
                </span>
              </div>
              <div className="">
                <label>Start Date:</label>
                <span className="">{caseData.createdAt}</span>
                <br></br>
                <label>Estimated End Date:</label>
                <span className="">22 December 2020</span>
              </div>
            </div>
            <Row
              style={{
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <Col>
                <Button
                  type="Submit"
                  style={{
                    background: "#2c40e6",
                    color: "#fff",
                    borderRadius: 0,
                    border: "none",
                    marginRight: 30,
                  }}
                  onClick={() => setVerdictModal(true)}
                >
                  Make Verdict
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    borderRadius: 0,
                    border: "none",
                  }}
                  type="Submit"
                >
                  Suspend Case
                </Button>
              </Col>
            </Row>
            <Row gutter={[48, 16]} className="case-timeline">
              <Col span={8}>
                <Card bordered={false} title="">
                  <Steps
                    size="small"
                    current={checkCurrent()}
                    status="error"
                    direction="vertical"
                  >
                    <Step title="Creation" />
                    <Step title="Invitations" />
                    <Step title="Assignment" />
                    <Step title="Hearings" />
                    <Step title="Completion" />
                  </Steps>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className="document-container border">
                  <div className="party">
                    <h5>
                      Parties{" "}
                      {/* <img src={PLUS} onClick={() => setAddCaseModall(true)} /> */}
                    </h5>
                    <Row gutter={[55, 10]}>
                      {caseData &&
                        caseData.members &&
                        caseData.members.map((item, index) => (
                          <Col span={24}>
                            <div className="name">
                              {`${item.firstName} ${item.lastName}`}
                            </div>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className="document-container border">
                  <div className="party">
                    <h5>Case Details</h5>
                    <Row gutter={[55, 10]}>
                      <Col span={12}>
                        <div className="name">Type:</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">{caseData.caseType.name}</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">Description:</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">{caseData.description}</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">Status:</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">{caseData.status}</div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={[48, 16]} className="case-timeline">
              <Col span={12}>
                <div className="update-section">
                  <Card bordered={false} className="document-container border">
                    <div className="update-card">
                      <div className="party">
                        <h4>
                          Updates{" "}
                          <img
                            src={PLUS}
                            onClick={() => setAddCaseModall(true)}
                            width={15}
                            height={15}
                          />
                        </h4>
                      </div>
                      {caseData?.caseUpdates?.map((update) => {
                        return (
                          <Row className="pb-2">
                            <Col span={8}>
                              {moment(caseData?.updateAt).format("MM DD YYYY")}
                            </Col>
                            <Col span={8}>{update.updates}</Col>
                            <Col span={8}>
                              <div className="text-end">
                                <a href="">View</a>
                                <a href="" className="b-left"></a>
                                <a href="">Request</a>
                              </div>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              </Col>
              <Col span={12}>
                <div className="update-section">
                  <Card bordered={false} className="document-container border">
                    <div className="update-card">
                      <div className="party">
                        <h4>
                          Hearings{" "}
                          <img
                            src={PLUS}
                            onClick={() => setHearingModal(true)}
                            width={15}
                            height={15}
                          />
                        </h4>
                      </div>
                      {caseData?.hearings?.map((hear) => {
                        return (
                          <Row className="pb-2">
                            <Col span={8}>
                              {moment(hear?.updateAt).format("MM DD YYYY")}
                            </Col>
                            <Col span={4}>{caseData?.title}</Col>
                            <Col span={4}>
                              {moment(hear?.startDateTime).format("MM DD YYYY")}
                            </Col>
                            <Col span={8}>
                              <div className="text-end">
                                <a href="">View</a>
                                <a href="" className="b-left"></a>
                                <a href="">Request</a>
                              </div>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
            <Row gutter={[48, 16]} className="case-timeline">
              <Col span={24}>
                <div className="update-section">
                  <Card bordered={false} className="document-container border">
                    <div className="update-card">
                      <div className="party">
                        <h4>
                          Documents{" "}
                          <img
                            src={PLUS}
                            onClick={() => setHearingModal(true)}
                            width={15}
                            height={15}
                          />
                        </h4>
                      </div>
                      {caseData?.documents?.length > 0
                        ? caseData?.documents?.map((hear) => {
                            return (
                              <Row className="pb-2">
                                <Col span={8}>
                                  {moment(hear?.updateAt).format("MM DD YYYY")}
                                </Col>
                                <Col span={4}>{caseData?.title}</Col>
                                <Col span={4}>
                                  {moment(hear?.startDateTime).format(
                                    "MM DD YYYY"
                                  )}
                                </Col>
                                <Col span={8}>
                                  <div className="text-end">
                                    <a href="">View</a>
                                    <a href="" className="b-left"></a>
                                    <a href="">Request</a>
                                  </div>
                                </Col>
                              </Row>
                            );
                          })
                        : "No Documents Added"}
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <ShimmerEffect />
      )}
    </MediatorDashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  caseData: state.case,
  casesData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
});
// const mapDispatchToProps = {
//   makeVerdict,
//   updateCase,
// }
export default connect(mapStateToProps)(MediatorCase);
