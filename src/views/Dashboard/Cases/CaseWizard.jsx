import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Dropdown, Menu, Steps, Button, message } from "antd";
import { DashboardLayout } from "../../../layouts";
import { DownOutlined } from "@ant-design/icons";
import PLUS from "../../../assets/images/plus.png";
import Union from "../../../assets/images/Union.png";
import Back from "../../../assets/images/back.png";

import { unsecured } from "../../../utils/constants";
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

const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const CaseForm = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
                <div className="steps-content">
                  {" "}
                  <Row className="mt-2">
                    <Col span={8}>Contract Type:</Col>
                    <Col span={16}>
                      {" "}
                      <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        className="dropdown-organize"
                      >
                        <a
                          className="ant-dropdown-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          Arohan Infra Private Limited <DownOutlined />
                        </a>
                      </Dropdown>
                    </Col>
                  </Row>
                  {/* <Row className='mt-2'>
                    <Col span={8}>Scanned copy of Contract:</Col>
                    <Col span={16}> Upload</Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col span={8}>Scanned copy of Contract:</Col>
                    <Col span={16}> Upload</Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col span={8}>Scanned copy of Contract:</Col>
                    <Col span={16}> Upload</Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col span={8}>Scanned copy of Contract:</Col>
                    <Col span={16}> Upload</Col>
                  </Row> */}
                </div>
                <div className="steps-action">
                  {/* {current < steps.length - 1 && (
                <Button type='primary' onClick={() => next()}>
                  Next
                </Button>
              )} */}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => message.success("Processing complete!")}
                    >
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                      Previous
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
            <Col span={10} style={{ justifyContent: "flex-end" }}>
              <h3>Summary:</h3>

              <Card bordered={false} className="document-container card-border">
                <div className="steps-content">
                  {" "}
                  <Row className="mt-2">
                    <Col span={8}>Case Type:</Col>
                    <Col span={16}> Franchise Agreement</Col>
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
                    <Col span={16}>
                      {" "}
                      ins-health-hdfc.pdf, accident-leg.jpg, bill-hos.png
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col span={8}>Other Party:</Col>
                    <Col span={16}> Mediator Sunanda Rao assigned</Col>
                  </Row>
                  {/* <Row className='mt-2'>
                    <Col span={8}>Scanned copy of Contract:</Col>
                    <Col span={16}> Upload</Col>
                  </Row> */}
                </div>
                <div className="steps-action">
                  {/* {current < steps.length - 1 && (
                <Button type='primary' onClick={() => next()}>
                  Next
                </Button>
              )} */}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => message.success("Processing complete!")}
                    >
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                      Previous
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CaseForm;
