import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  notification,
} from "antd";
import { QuestionCircleOutlined, SmileFilled } from "@ant-design/icons";

import { DashboardLayout } from "../../../layouts";
import UserAvatar from "../../../assets/images/useravtar.png";
import pencil from "../../../assets/images/Subtract.png";
import { connect } from "react-redux";
import {
  editUser,
  updateProfilePic,
  fetchUser,
} from "../../../store/actions/user";
import { resetPassword } from "../../../store/actions/auth";
import UpdateDetails from "./UpdateDetails";
import UpdatePassword from "./UpdatePassword";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park",
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = ({ user, dispatch }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [imageFile, setimageFile] = useState(null);

  const onFinish = async (values) => {
    await dispatch(
      editUser({
        ...values,
      })
    );
    notification.open({
      message: "Success",
      description: "Profile  Updated SuccessFully",
      icon: <SmileFilled />,
    });
    setDisabled(true);
    // form.resetFields();
  };

  const updateProfilePhoto = async (target) => {
    let file = target.files[0];
    let formData = new FormData();
    formData.append("_id", user._id);
    formData.append("profilePic", file);
    const res = await dispatch(updateProfilePic(formData));
    if (res == true) {
      notification.open({
        message: "Success",
        description: "Profile Photo Updated SuccessFully",
        icon: <SmileFilled />,
      });
      await dispatch(fetchUser());
    } else {
      notification.open({
        message: "Failure",
        description: "Profile Photo Update Failed",
        // icon: <SmileFilled />,
      });
    }
  };

  const onFinishPassword = async (values) => {
    if (values.password && values.password2) {
      await dispatch(
        resetPassword({
          ...values,
        })
      );
      notification.open({
        message: "Success",
        description: "Password Updated SuccessFully",
        icon: <SmileFilled />,
      });
      // form.resetFields();
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <DashboardLayout>
      <div className="settings">
        <Row>
          <Col span={6} className="userprofile">
            <div className="flex">
              <div class="image-upload">
                <label for="file-input">
                  <img
                    src={user?.profilePic ? user?.profilePic : UserAvatar}
                    alt="avatar"
                  />
                </label>

                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => updateProfilePhoto(e.target)}
                />
              </div>

              <div className="">
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
                <span className="pencil-image">
                  <img src={pencil} onClick={() => setDisabled(!disabled)} />{" "}
                  Update
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <UpdateDetails
          className="form-input"
          onFinish={onFinish}
          user={user}
          disabled={disabled}
        />
        <UpdatePassword
          className="form-input"
          onFinish={onFinishPassword}
          disabled={disabled}
        />
        <div className="Notification">
          <Card bordered={false} className="document-container">
            <h5>Notifications</h5>
            <p className="mb-2">Now you can customize your notifications</p>

            <Row className="border-btm">
              <Col span={12}>
                <h5>Case Update</h5>
                <p>Receive a notification for every update in your case</p>
              </Col>
              <Col span={12}>
                <div className="text-end">
                  <Checkbox></Checkbox> Email
                </div>
              </Col>
            </Row>
            <Row className="border-btm">
              <Col span={12}>
                <h5>Newsletter</h5>
                <p>Receive a notification and a soft copy of our Newsletter</p>
              </Col>
              <Col span={12}>
                <div className="text-end">
                  <Checkbox></Checkbox> Email
                </div>
              </Col>
            </Row>
            <Row className="border-btm">
              <Col span={12}>
                <h5>Legal News</h5>
                <p>
                  Receive a notification and o soft copy of our weekly legal
                  news analysis
                </p>
              </Col>
              <Col span={12}>
                <div className="text-end">
                  <Checkbox></Checkbox> Email
                </div>
              </Col>
            </Row>
            <Row className="border-btm">
              <Col span={12}>
                <h5>Organisation Update</h5>
                <p>
                  Receive a notification for every update in your organisation
                </p>
              </Col>
              <Col span={12}>
                <div className="text-end">
                  <Checkbox></Checkbox> Email
                </div>
              </Col>
            </Row>
            <div className="float-right">
              {" "}
              <Button type="primary" htmlType="submit" className="btn-reg">
                Save and Update
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state, ownProps) => ({
  organization: state.organization,
  user: state.user,
  organizationId: ownProps.match.params.organizationId,
  history: ownProps.history,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  cases: state.cases,
  hearings: state.hearings,
});

export default connect(mapStateToProps)(RegistrationForm);
