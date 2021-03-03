import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;

const DeleteNutral = ({ onFinish, users }) => {
  const [loading, setLoading] = useState(false);
  const renderMediators = () => {
    return users
      ?.filter((i) => i.role === 'Mediator' || i.role === 'neutral')
      .map((ct, index) => (
        <Option key={index} value={ct._id}>
          {ct.email}
        </Option>
      ));
  };

  const onSubmitClick = async (values) => {
    console.log('submit clicked: '+values );
    setLoading(true);
    await onFinish(values);
    setLoading(false);
  };

  return (
    <Form name="DeleteNutral" onFinish={onSubmitClick}>
      <Form.Item
        name="id"
        rules={[{ required: true, message: 'Please input the case type!' }]}
      >
        <Select placeholder="Select Mediator" id="deleteUser">
          {renderMediators()}
        </Select>
      </Form.Item>
      <Form.Item>
        {/* <Button type="primary" htmlType="submit" block className="adamin">
                Remove
              </Button> */}
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
          className="adamin"
        >
          {loading ? 'Removeing' : 'Remove'}
        </Button>
      </Form.Item>
    </Form>
  );
};

DeleteNutral.propTypes = {
  onFinish: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  caseType: PropTypes.string,
  caseTypes: PropTypes.arrayOf(object).isRequired,
  organization: PropTypes.string,
};

DeleteNutral.defaultProps = {
  title: '',
  description: '',
  caseType: '',
  organization: '',
};

const mapStateToProps = (state) => ({
  cases: state.adminCaseDetail,
  users: state.adminUsers,
});

export default connect(mapStateToProps)(DeleteNutral);
