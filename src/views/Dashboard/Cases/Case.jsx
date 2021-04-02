import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Steps,
  Modal,
  message,
  Space,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, SmileFilled } from "@ant-design/icons";
import Plus from "../../../assets/images/plus.png";
import Union from "../../../assets/images/Union.png";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { DashboardLayout } from "../../../layouts";
import UploadForm from "../../../components/Document/UploadForm";
import { uploadDocument } from "../../../store/actions/documents";
import {
  CaseHeader,
  // InviteForm,
  HearingForm,
  VerdictForm,
} from "../../../components";
import HearingsTable from "../../../components/Hearing/HearingTable";
import CasePartiesTable from "../../../components/Case/CasePartiesTable";

import { fetchCase, inviteParty } from "../../../store/actions/case";
import { updateCse } from "../../../store/actions/cases";
import { fetchUser, fetchUsers } from "../../../store/actions/user";
import { fetchOrganizations } from "../../../store/actions/organizations";
// import UploadForm from "../../../components/Document/UploadForm";
import $http from "../../../utils/api";
import Back from "../../../assets/images/back.png";
import PLUS from "../../../assets/images/plus.png";
import InviteForm from "./InviteForm";
import ShimmerEffect from "../../../components/shimmer";

const { Step } = Steps;

const Case = ({
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
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false);
  const [item, setItem] = useState("Select Item");
  const [reciver, setReciver] = useState("");
  //store details about how the case is being accessed by the user
  const [access, updateAccess] = useState(null);
  const { caseId } = useParams();
  const history = useHistory();
  console.log(match.params, "paransnns");
  //initial data fetch
  useEffect(() => {
    dispatch(fetchCase(caseId));
    dispatch(fetchUsers());
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
  const showInviteModal = () => setInviteModal(true);

  const showVerdictModal = () => setVerdictModal(true);

  const handleOk = (e) =>
    setHearingModal(false) && setInviteModal(false) && setDocumentModal(false);

  const handleCancel = (e) =>
    setHearingModal(false) && setInviteModal(false) && setDocumentModal(false);

  const onDocumentUploadClick = (fd) => {
    fd.append("creater", user._id);
    fd.append("createrType", "User");
    $http()({
      url: "documents/upload",
      method: "post",
      processData: false,
      data: fd,
    })
      .then((res) => {
        //message.success("upload successfully.");
        console.log(res.data.data[0].url, "ressss");
        dispatch(
          updateCse({
            _id: match.params.caseId,
            $push: { supportingDocuments: res.data.data[0].url },
          })
        );
        setUploadFormVisibility(false);
        notification.open({
          message: "Success",
          description: "Document Uploaded SuccessFully",
          icon: <SmileFilled style={{ color: "#108ee9" }} />,
        });
        return true;
      })
      .catch((e) => {
        console.log(e, "eeeee");
        message.error("upload failed.");
        return false;
      });
  };

  const Conditionally = () => (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card
          bordered={false}
          title="Case Parties"
          actions={[
            access && access.access && (
              <Button
                icon={<EditOutlined />}
                block
                type="primary"
                onClick={showInviteModal}
                style={{ maxWidth: "95%", marginBottom: 10 }}
              >
                Send Invite
              </Button>
            ),
          ]}
        >
          <CasePartiesTable
            members={caseData.members}
            organizations={caseData.organizations}
          />
        </Card>
      </Col>
    </>
  );
  const handleChange = async (value) => {
    console.log(value, "valueee");
    setReciver(value);
    // setItem(inputValue);
    // return inputValue;
  };
  const onInvitationFormSubmit = async (values) => {
    console.log(access, "access");
    const res = await dispatch(
      inviteParty({
        senderType: access.type,
        sender: access.id,
        invitationType: "Case",
        case: caseId,
        email: reciver,
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

  console.log(user, "case in case");
  return (
    <DashboardLayout>
      {caseData ? (
        <>
          <Modal
            title="Invite Party"
            visible={addCaseModal}
            onCancel={() => setAddCaseModall(false)}
            destroyOnClose={true}
            footer={null}
          >
            <InviteForm
              onFinish={onInvitationFormSubmit}
              item={item}
              handleChange={handleChange}
              users={user?.allusers}
            />
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
          <div className="case-section">
            <div className="address">
              <Space>
                <div className="name">
                  <p>
                    <Space>
                      <img src={Back} onClick={history.goBack} />
                      {caseData?.members.length > 0
                        ? caseData?.members.map((item, index) => (
                            <span>
                              {index ? " Vs " : ""} {item.firstName}{" "}
                              {item.lastName}
                            </span>
                          ))
                        : ""}
                    </Space>
                  </p>
                  <span className="">
                    <a href="">Hearing link</a>
                  </span>
                </div>
              </Space>
              <div className="">
                <label>Start Date:</label>
                <span className="">{caseData.createdAt}</span>
                <br></br>
                <label>Estimated End Date:</label>
                <span className="">22 December 2020</span>
              </div>
            </div>
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
                      <img src={PLUS} onClick={() => setAddCaseModall(true)} />
                    </h5>
                    <Row gutter={[40, 10]}>
                      {caseData &&
                        caseData.members &&
                        caseData.members.map((item, index) => (
                          <Col span={24} className="bg-grey">
                            <div className="name">
                              {`${item.firstName} ${item.lastName}`}
                            </div>
                          </Col>
                        ))}

                      {/* <Col span={12}>
                        <div className="parties">Accused</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">Arohan Infra Priv...</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">Reference Party</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">HDFC Bank</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">Member</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">Prashant Anvi</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">Witness</div>
                      </Col> */}
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className="document-container border">
                  <div className="party">
                    <h5>Case Details</h5>
                    <Row gutter={[40, 10]} className="bg-grey">
                      <Col span={12}>
                        <div className="name">Type:</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">{caseData.caseType.name}</div>
                      </Col>
                    </Row>
                    <Row gutter={[40, 10]}>
                      <Col span={12}>
                        <div className="name">Description:</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">{caseData.description}</div>
                      </Col>
                    </Row>
                    <Row gutter={[40, 10]} className="bg-grey">
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
                <Card bordered={false} className="document-container border">
                  {/* <div className="update-card"> */}
                  <Space>
                    <Row className="upcoming">
                      <h4
                        onClick={() =>
                          setUploadFormVisibility(!uploadFormVisbility)
                        }
                      >
                        Documents <img src={Plus} alt="plus" />
                      </h4>

                      <Link to="#">view all</Link>
                    </Row>
                  </Space>
                  {caseData?.supportingDocuments?.map((docs) => (
                    <Row>
                      <Col span={10} className="documentText">
                        <img src={docs} height="50px" width="50px" />
                      </Col>
                      <Col
                        span={12}
                        className="download"
                        style={{ textAlign: "end", marginTop: 5 }}
                      >
                        <img
                          src={Union}
                          alt="download"
                          height="15px"
                          width="10px"
                          onClick={() => download(docs)}
                        />
                      </Col>
                    </Row>
                  ))}
                  {/* </div> */}
                </Card>
                {/* <Card bordered={false} className="document-container">
                  <Row className="upcoming">
                    <h4>Documents</h4>
                    <img src={Plus} alt="plus" />
                    <Link to="#">view all</Link>
                  </Row>
                  {caseData?.documents?.map((docs) => (
                    <Row>
                      <Col span={12} className="documentText">
                        {docs.name}
                      </Col>
                      <Col span={12} className="download">
                        Image <img src={Union} alt="download" />
                      </Col>
                    </Row>
                  ))}
                </Card> */}
              </Col>
              <Col span={12}>
                <Card bordered={false} className="document-container border">
                  <div className="update-card">
                    <h4>Updates</h4>
                    <Row className="pb-2 bg-grey">
                      <Col span={8}>Dec 21, 2020, 21:27</Col>
                      <Col span={8}>Mediator Sunanda Rao assigned</Col>
                      <Col span={8}>
                        <div className="text-end">
                          <a href="">View</a>
                          <a href="" className="b-left"></a>
                          <a href="">Request</a>
                        </div>
                      </Col>
                    </Row>
                    <Row className="pb-2">
                      <Col span={8}>Dec 21, 2020, 21:27</Col>
                      <Col span={8}>Mediator Sunanda Rao assigned</Col>
                      <Col span={8}>
                        <div className="text-end">
                          <a href="">View</a>
                          <a href="" className="b-left"></a>
                          <a href="">Request</a>
                        </div>
                      </Col>
                    </Row>
                    <Row className="pb-2 bg-grey">
                      <Col span={8}>Dec 21, 2020, 21:27</Col>
                      <Col span={8}>Mediator Sunanda Rao assigned</Col>
                      <Col span={8}>
                        <div className="text-end">
                          <a href="">View</a>
                          <a href="" className="b-left"></a>
                          <a href="">Request</a>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>Dec 21, 2020, 21:27</Col>
                      <Col span={8}>Mediator Sunanda Rao assigned</Col>
                      <Col span={8}>
                        <div className="text-end">
                          <a href="">View</a>
                          <a href="" className="b-left"></a>
                          <a href="">Request</a>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <ShimmerEffect />
      )}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  caseData: state.case,
  casesData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
});

export default connect(mapStateToProps)(Case);
