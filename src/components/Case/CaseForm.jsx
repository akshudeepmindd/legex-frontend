import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const CaseForm = ({
  onFinish,
  handleChange,
  title,
  description,
  caseTypes,
  caseType,
}) => {
  const renderCaseTypes = () => {
    return caseTypes.map((d, index) => <Option key ={index} value={d._id}>{d.name}</Option>);
  };

  return (
    <Form name="CaseForm" onFinish={onFinish}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the case title!' }]}
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[
          { required: true, message: 'Please input the case description!' },
        ]}
      >
        <TextArea
          rows={2}
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="caseType"
        rules={[{ required: true, message: 'Please input the case type!' }]}
      >
        <Select value={caseType} onChange={handleChange}>
          {renderCaseTypes()}
        </Select>
      </Form.Item>

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
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  caseType: PropTypes.string,
  caseTypes: PropTypes.instanceOf(Array).isRequired,
  //caseTypes: PropTypes.array,
};

CaseForm.defaultProps = {
  title: '',
  description: '',
  caseType: '',
};

export default CaseForm;
