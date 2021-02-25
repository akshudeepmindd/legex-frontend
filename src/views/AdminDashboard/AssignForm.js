import React, { useState } from "react";
import PropTypes, { object } from "prop-types";
import { Form, Input, Button, Select } from "antd";
import { connect } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;

const AssignForm = ({ onFinish, users }) => {
  const [loading, setLoading] = useState(false);
  const renderCaseTypes = () => {
    return users
      ?.filter((i) => i.role === "Mediator")
      .map((ct, index) => (
        <Option key={index} value={ct._id}>
          {ct.email}
        </Option>
      ));
  };

  const onSubmitClick = async (values) => {
    setLoading(true);
    await onFinish(values);
    setLoading(false);
  };

  return (
    <Form name="AssignForm" onFinish={onSubmitClick}>
      <Form.Item
        name="mediator"
        rules={[{ required: true, message: "Please input the case type!" }]}
      >
        <Select placeholder="Select Mediator">{renderCaseTypes()}</Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {loading ? "Submitting" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

AssignForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  caseType: PropTypes.string,
  caseTypes: PropTypes.arrayOf(object).isRequired,
  organization: PropTypes.string,
};

AssignForm.defaultProps = {
  title: "",
  description: "",
  caseType: "",
  organization: "",
};

const mapStateToProps = (state) => ({
  cases: state.adminCaseDetail,
  users: state.adminUsers,
});

export default connect(mapStateToProps)(AssignForm);
