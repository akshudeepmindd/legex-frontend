import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Menu,
  Steps,
  Button,
  message,
  Select,
  notification,
} from "antd";
import { DashboardLayout } from "../../../layouts";
import { SmileFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import PLUS from "../../../assets/images/plus.png";
import Union from "../../../assets/images/Union.png";
import Back from "../../../assets/images/back.png";
import { useHistory, useLocation } from "react-router-dom";
import CaseTypeForm from "./CaseTypeForm";
import CaseDetailForm from "./CaseDetailForm";
import SecondPartyDetails from "./SecondPartyDetails";
import { createCase } from "../../../store/actions/cases";

import { unsecured } from "../../../utils/constants";
import SimpleReactValidator from "simple-react-validator";

const { Step } = Steps;

const CaseForm = ({ dispatch, caseTypes, user }) => {
  const [current, setCurrent] = React.useState(0);
  const [fileList, updateFileList] = useState([]);
  const validator = useRef(new SimpleReactValidator());
  const [type, setType] = React.useState();
  const [caseType, setCaseType] = React.useState();
  const [provider, setProvider] = React.useState();
  const [status, setStatus] = React.useState();
  const [url, setDocumentUrl] = React.useState("");
  const history = useHistory();
  const [value, setValue] = React.useState({
    referenceNo: "",
    claimAmount: "",
    additionalDetails: "",
    supportingDocuments: "",
    secondPartyName: "",
    secondPartyEmail: "",
    secondPartyPhone: "",
    description: "",
  });

  const handleSelectCaseType = (e) => {
    console.log(e, "handleSelectType");
    setCaseType(e);
  };

  const handleSelectType = (e) => {
    console.log(e, "handleSelectType");
    setType(e);
  };
  const handleSelectProvider = (e) => {
    console.log(e, "handleSelectType");
    setProvider(e);
  };
  const handleSelectStatus = (e) => {
    console.log(e, "handleSelectType");
    setStatus(e);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.current.showMessageFor(e.target.name);
  };

  const onFinish = async () => {
    if (validator.current.allValid()) {
      const params = {
        createrType: "User",
        creater: user._id,
        type,
        status,
        provider,
        title: "XYZ",
        caseType: caseType,
        document: url,
        ...value,
      };
      console.log(params, "params");
      const response = await dispatch(createCase(params));
      console.log(response, "response");
      if (response._id) {
        notification.open({
          message: "Success",
          description: "Case is created SuccessFully",
          icon: <SmileFilled />,
        });
        history.push(`/dashboard/cases/${response._id}`);
      }
      return response;
    }
  };

  const steps = [
    {
      title: "Case Type",
      content: <CaseTypeForm handleSelectCaseType={handleSelectCaseType} />,
    },
    {
      title: "Case Details",
      content: (
        <CaseDetailForm
          value={value}
          validator={validator}
          handleSelectProvider={handleSelectProvider}
          handleSelectStatus={handleSelectStatus}
          handleChange={handleChange}
          handleSelectType={handleSelectType}
          setDocumentUrl={setDocumentUrl}
          userId={user?._id}
          updateFileList={updateFileList}
          fileList={fileList}
        />
      ),
    },
    {
      title: "Second Party Details",
      content: (
        <SecondPartyDetails
          value={value}
          handleChange={handleChange}
          validator={validator}
        />
      ),
    },
    // {
    //   title: "Invite Other Party",
    //   content: "Last-content",
    // },
  ];
  const next = () => {
    setCurrent((prevCurrent) => prevCurrent + 1);
  };

  const prev = () => {
    setCurrent((prevCurrent) => prevCurrent - 1);
  };
  // const onChangeCaseType = (value) => {
  //   setCaseType(value);
  // };
  const step1style = {
    height: "40rem",
  };

  const step2Style = {
    height: "50rem",
  };
  console.log(current, "current");
  return (
    <>
      <DashboardLayout>
        <div className="secure-contract">
          <div className="address">
            <div className="name">
              <p>
                <img
                  src={Back}
                  onClick={() => history.goBack()}
                  className="back-arrow"
                />{" "}
                File And Resolve Dispute
              </p>
            </div>
            <div className="">
              <label>Start Date:</label>
              <span className="">15 November 2020</span>
              <br></br>
              <label>Estimated End Date:</label>
              <span className="">22 December 2020</span>
            </div>
          </div>
          <Row gutter={[48, 16]} className="step-form">
            <Col span={14}>
              <Card
                bordered={false}
                className="document-container card-border"
                style={current === 0 || current == 2 ? step1style : step2Style}
              >
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                  {}
                </Steps>
                <div>{steps[current].content}</div>

                <div className="steps-action">
                  {current < steps.length - 1 && (
                    <Button
                      type="primary"
                      className="next-btn"
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      className="prev-btn"
                      onClick={onFinish}
                    >
                      Done
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button
                      style={{ margin: "0 8px" }}
                      className="prev-btn"
                      onClick={() => next()}
                    >
                      Proceed
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
            <Col span={10} style={{ justifyContent: "flex-end" }}>
              <Card
                bordered={false}
                className="document-container card-border p-0"
              >
                <h3>Summary:</h3>
                <div className="steps-content">
                  {" "}
                  <Row className="mt-2">
                    <Col span={8}>Case Type:</Col>
                    <Col span={16}> {type}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Description:</Col>
                    <Col span={16}> {value.description}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Contract Value: </Col>
                    <Col span={16}> {value.claimAmount}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Other Party:</Col>
                    <Col span={16}> {value.secondPartyName}</Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </DashboardLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
});

export default connect(mapStateToProps)(CaseForm);
