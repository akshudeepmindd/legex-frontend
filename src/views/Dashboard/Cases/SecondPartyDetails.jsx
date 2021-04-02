import React from "react";
import { Input, Col, Row, Select } from "antd";
import { connect } from "react-redux";

const SecondPartyDetails = ({ caseTypes, value, handleChange, validator }) => {
  return (
    <Col>
      <Row className="mt-2">
        <Col span={8}>Second Party Name:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="secondPartyName"
            value={value.secondPartyName}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Second Party Email:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="secondPartyEmail"
            value={value.secondPartyEmail}
            onChange={(e) => handleChange(e)}
          />
          {validator.current.message(
            "secondPartyEmail",
            value.secondPartyEmail,
            "required|email"
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Second Party Phone:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="secondPartyPhone"
            value={value.secondPartyPhone}
            onChange={(e) => handleChange(e)}
          />
          {validator.current.message(
            "secondPartyPhone",
            value.secondPartyPhone,
            "phone|numeric|min:10"
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Description:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="additionalDetails"
            value={value.additionalDetails}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
});

export default connect(mapStateToProps)(SecondPartyDetails);
