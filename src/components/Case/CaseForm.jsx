import React from "react";
import PropTypes, { object } from "prop-types";
import { Form, Input, Button, Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;

const CaseForm = ({
  onFinish,
  title,
  description,
  caseTypes,
  caseType,
  organization,
  organizations,
}) => {
  const user = useSelector((state) => state.users.user);
  const renderCaseTypes = () => {
    return caseTypes.map((d, index) => (
      <Option key={index} value={d._id}>
        {d.name}
      </Option>
    ));
  };
  const renderUserOrganizations = () =>
    organizations.map(
      (organization, index) =>
        organization.owner._id === user._id && (
          <Option key={index} value={organization._id}>
            {organization.name}
          </Option>
        )
    );
  return (
    <Form name="CaseForm" onFinish={onFinish}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input the case title!" }]}
      >
        <Input type="text" placeholder="Title" value={title} />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[
          { required: true, message: "Please input the case description!" },
        ]}
      >
        <TextArea rows={2} placeholder="Description" value={description} />
      </Form.Item>

      <Form.Item
        name="caseType"
        rules={[{ required: true, message: "Please input the case type!" }]}
      >
        <Select placeholder="case type" value={caseType}>
          {renderCaseTypes()}
        </Select>
      </Form.Item>
      {/* <Form.Item
        name="organization"
        rules={[{ required: true, message: "Please select an organization!" }]}
      >
        <Select placeholder="organization" value={organization}>
          {renderUserOrganizations()}
        </Select>
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

CaseForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  caseType: PropTypes.string,
  caseTypes: PropTypes.arrayOf(object).isRequired,
  organization: PropTypes.string,
  organizations: PropTypes.arrayOf(object).isRequired,
};

CaseForm.defaultProps = {
  title: "",
  description: "",
  caseType: "",
  organization: "",
};

export default CaseForm;
