import React, { useState } from "react";
import PropTypes, { object } from "prop-types";
import { Form, Input, Button, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const CaseForm = ({ onFinish, title, description, caseTypes, caseType }) => {
  const [loading, setLoading] = useState(false);
  const renderCaseTypes = () => {
    return caseTypes.map((ct, index) => (
      <Option key={index} value={ct._id}>
        {ct.name}
      </Option>
    ));
  };
  const onSubmitClick = async (values) => {
    setLoading(true);
    const res = await onFinish(values);
    setLoading(false);
  };
  return (
    <Form name="CaseForm" onFinish={onSubmitClick}>
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

CaseForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  caseType: PropTypes.string,
  caseTypes: PropTypes.arrayOf(object).isRequired,
  organization: PropTypes.string,
};

CaseForm.defaultProps = {
  title: "",
  description: "",
  caseType: "",
  organization: "",
};

export default CaseForm;
