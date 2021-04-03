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

import { MediatorDashboardLayout } from "../../../layouts";
import UserAvatar from "../../../assets/images/useravtar.png";
import pencil from "../../../assets/images/Subtract.png";
import { connect } from "react-redux";
import {
  editUser,
  updateProfilePic,
  fetchUser,
} from "../../../store/actions/user";
import { resetPassword } from "../../../store/actions/auth";
import DetailsUpdateForm from "./DetailsUpdateForm";
import PasswordUpdateForm from "./PasswordUpdateForm";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

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

const MediatorSettings = ({ user, dispatch }) => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("values datail update>>>>>>>", values);
    await dispatch(
      editUser({
        ...values,
      })
    );
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
    }
    console.log("values password update>>>>>>>", values);
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
    <MediatorDashboardLayout>
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
        <DetailsUpdateForm
          className="form-input"
          onFinish={onFinish}
          user={user}
          disabled={disabled}
        />
        <PasswordUpdateForm
          className="form-input"
          onFinish={onFinishPassword}
          disabled={disabled}
        />
      </div>
    </MediatorDashboardLayout>
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

export default connect(mapStateToProps)(MediatorSettings);
