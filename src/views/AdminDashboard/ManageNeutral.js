import React, { useState } from "react";
import {
  Row,
  Col,
  Modal,
  Card,
  Select,
  Button,
  Input,
  Form,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import UserAvatar from "../../assets/images/useravtar.png";
import Plus from "../../assets/images/plus.png";
import { createCase } from "../../store/actions/cases";
import { SmileFilled } from "@ant-design/icons";
// import { CaseCard, CasesTable, CaseForm } from "../../../components";
import { useHistory } from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { createMediator, deleteNeutral } from "../../store/actions/auth";
import DeleteNutral from "./DeleteNutral";
import NutralForm from "./NutralForm";
import Axios from "axios";

// const onFinish = (value) => {
//   console.log(value);
// };

const Manage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async () => {
    const res = await dispatch(createMediator(data));
    console.log(res, "Resss");
    if (res?.success === true) {
      notification.open({
        message: "Success",
        description: "Netural Created SuccessFully",
        icon: <SmileFilled style={{ color: "#108ee9" }} />,
      });
      history.push("/admin/overview");
    } else {
      notification.open({
        message: "Error",
        description: "Issue In creating Netural",
        // icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    }
  };
  const onRemoveFinish = async (value) => await dispatch(deleteNeutral(value));
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
    password: "",
  });
  return (
    <AdminDashboardLayout>
      <Row gutter={[50, 20]}>
        <Col span={10}>
          <h3>Add a Neutral</h3>
          <NutralForm onFinish={onFinish} setData={setData} data={data} />
        </Col>
        <Col span={8}>
          <h3>Delete a Neutral</h3>
          <DeleteNutral onFinish={onRemoveFinish} />
        </Col>
      </Row>
    </AdminDashboardLayout>
  );
};

export default Manage;
