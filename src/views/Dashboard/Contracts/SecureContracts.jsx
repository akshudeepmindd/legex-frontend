import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Menu,
  Steps,
  Button,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DashboardLayout } from "../../../layouts";
import { DownOutlined } from "@ant-design/icons";
import PLUS from "../../../assets/images/plus.png";
import Union from "../../../assets/images/Union.png";
import Back from "../../../assets/images/back.png";
import ContractType from "./contractType";
import SecureDetail from "./SecureContractDetail";
import { unsecured } from "../../../utils/constants";
import { createContractCase } from "../../../store/actions/contract";
import { useDispatch, useSelector } from "react-redux";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);
const { Step } = Steps;

const Secure = () => {
  const [current, setCurrent] = React.useState(0);
  const [fileList, updateFileList] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const caseType = useSelector((state) => state.caseType);
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobile: "",
    contractValue: "",
    expiry: "",
    insureValue: "",
  });
  const dispatch = useDispatch();
  const [contractType, setContractType] = useState("Select a Contract Value");
  const [statuscontract, setstatus] = useState("Select a Status");
  const [secured, setsecured] = useState(false);
  const next = () => {
    setCurrent(current + 1);
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSelect = (value) => {
    console.log(value);
    setContractType(value);
  };
  const onFinish = async () => {
    const params = {
      createrType: "User",
      creater: user._id,
      contractdetails: {
        type: contractType,
        expiry: value.expiry,
      },
      InsuredValue: value.insureValue,
      contractValue: value.contractValue,
      otherDetails: {
        name: value.name,
        email: value.email,
        mobile: value.mobile,
      },
      isSecursd: secured,
      ...value,
    };
    console.log(params, "paramsmsm");
    const res = await dispatch(createContractCase(params));
    history.push("/dashboard/contracts");
    console.log(res, "ressss");
  };
  const handleSelectCaseType = (value) => {
    setstatus(value);
  };
  const steps = [
    {
      title: "Contract Details",
      content: (
        <ContractType
          value={value}
          contractType={contractType}
          fileList={fileList}
          updateFileList={updateFileList}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
      ),
    },
    {
      title: "Other Party Details",
      content: (
        <SecureDetail
          value={value}
          handleChange={handleChange}
          handleCheck={setsecured}
          handleSelect={handleSelect}
          statuscontract={statuscontract}
          handleSelectCaseType={handleSelectCaseType}
        />
      ),
    },
  ];
  const prev = () => {
    setCurrent(current - 1);
  };
  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    updateFileList(newFileList);
  };
  const beforeUpload = (file) => {
    updateFileList([...fileList, file]);
    return false;
  };
  return (
    <>
      <DashboardLayout>
        <div className="secure-contract">
          <div className="address">
            <div className="name">
              <p>
                <img src={Back} /> Gurmeet Kaur vs HDFC Bank
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
          <Row gutter={[48, 16]}>
            <Col span={14}>
              <Card bordered={false} className="document-container card-border">
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>

                <div className="steps-action">
                  {current < steps.length - 1 && (
                    <Button
                      type="primary"
                      className="next-btn"
                      onClick={() => next()}
                    >
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      className="next-btn"
                      onClick={() => onFinish()}
                    >
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button
                      style={{ margin: "0 8px" }}
                      className="prev-btn"
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
            <Col span={10} style={{ justifyContent: "flex-end" }}>
              <Card bordered={false} className="document-container card-border">
                <h3>Summary:</h3>
                <div className="steps-content">
                  {" "}
                  <Row className="mt-2">
                    <Col span={8}>Contract Type:</Col>
                    <Col span={16}> {contractType}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Description:</Col>
                    <Col span={16}>
                      {" "}
                      Mediator Sunanda Rao assigned Mediator Su Rao assigned
                      Mediator Sunanda Raassigned Mediator Sunanda{" "}
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Contract Value:</Col>
                    <Col span={16}> {value.contractValue}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Other Party:</Col>
                    <Col span={16}> {value.name}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Scanned copy of Contract:</Col>
                    <Col span={16}>{fileList[0]?.name}</Col>
                  </Row>
                </div>
                {/* <div className='steps-action'>
                  {current < steps.length - 1 && (
                    <Button type='primary' onClick={() => next()}>
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      type='primary'
                      onClick={() => message.success('Processing complete!')}
                    >
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                      Previous
                    </Button>
                  )}
                </div> */}
              </Card>
            </Col>
          </Row>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Secure;
