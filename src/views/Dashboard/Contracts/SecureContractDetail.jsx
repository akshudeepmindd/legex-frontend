import React from "react";
import { Input, Col, Row, Select, Checkbox } from "antd";
import { connect } from "react-redux";
import { cstatus } from "../../../utils/constants";
const OtherDetails = ({
  caseTypes,
  value,
  handleChange,
  handleCheck,
  statuscontract,
  handleSelectCaseType,
  validator,
}) => {
  return (
    <Col>
      <Row className="mt-2">
        <Col span={8}>Name:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="name"
            value={value.name}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Email:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="email"
            value={value.email}
            onChange={(e) => handleChange(e)}
          />
          {validator.current.message("email", value?.email, "required|email")}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Case Type:</Col>
        <Col span={16}>
          {" "}
          <Select
            name="caseType"
            placeholder="Select a caseType"
            onChange={handleSelectCaseType}
            value={statuscontract}
          >
            {cstatus?.length > 0
              ? cstatus?.map((item, index) => (
                  <Select.Option value={item.title} key={index}>
                    {item.title}
                  </Select.Option>
                ))
              : "null"}
          </Select>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Phone:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="mobile"
            value={value.mobile}
            type="number"
            onChange={(e) => handleChange(e)}
          />
          {validator.current.message(
            "mobile",
            value?.mobile,
            "phone|numeric|min:10"
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Insure Value:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="insureValue"
            value={value.insureValue}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Contract Value:</Col>
        <Col span={16}>
          {" "}
          <Input
            name="contractValue"
            value={value.contractValue}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>Secured:</Col>
        <Col span={16}>
          <Checkbox onChange={(e) => handleCheck(e.target.checked)} />
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

export default connect(mapStateToProps)(OtherDetails);
