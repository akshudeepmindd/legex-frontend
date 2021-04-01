import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Col, Row, Select } from "antd";
import { connect } from "react-redux";

function DetailsUpdateForm(props) {
  const {
    onFinish,
    handleChange,
    firstName,
    lastName,
    phone,
    user,
    email,
    disabled,
  } = props;

  console.log("uuuuuuuuuuuuuuu", firstName);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      className="form-input formFeiled"
      {...formItemLayout}
      //   form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input
          type="text"
          placeholder="Firstname"
          defaultValue={user?.firstName}
          disabled={disabled}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input
          type="text"
          placeholder="lastname"
          defaultValue={user?.lastName}
          disabled={disabled}
        />
      </Form.Item>
      <Form.Item name="bio" label="bio">
        <Input
          type="text"
          placeholder="bio"
          defaultValue={user?.bio}
          disabled={disabled}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input type="email" placeholder="Email" defaultValue={user?.email} />
      </Form.Item>

      <Form.Item label="Phone Number" style={{ marginBottom: 0 }}>
        <Form.Item
          name="phone"
          rules={[
            {
              message: "Please input your phone number!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(70% - 8px)" }}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "200%",
            }}
            defaultValue={user?.phone}
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(30% - 8px)",
            margin: "0 8px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="btn-reg"
            disabled={disabled}
          >
            Save and Update
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}

DetailsUpdateForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

// const mapStateToProps = (state) => ({
//   cases: state.cases,
//   user: state.user,
//   organization: state.organization,
//   organizations: state.organizations,
//   hearings: state.hearings,
//   caseTypes: state.caseTypes.caseTypes,
// });

export default connect(null)(DetailsUpdateForm);
