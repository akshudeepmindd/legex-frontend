import React, { useState } from "react";
import { Row, Col, Modal, Card, Select, Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import UserAvatar from "../../assets/images/useravtar.png";
import Plus from "../../assets/images/plus.png";
import { createCase } from "../../store/actions/cases";
// import { CaseCard, CasesTable, CaseForm } from "../../../components";
import { useHistory } from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { registerUser, deleteNeutral } from "../../store/actions/auth";
import DeleteNutral from "./DeleteNutral";
import NutralForm from "./NutralForm";
import Axios from "axios";

// const onFinish = (value) => {
//   console.log(value);
// };

const Manage = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => await dispatch(registerUser(values));
  const onRemoveFinish = async (value) => await dispatch(deleteNeutral(value));
  return (
    <AdminDashboardLayout>
      <Row gutter={[50, 20]}>
        <Col span={10}>
          <h3>Add a Neutral</h3>
          <NutralForm onFinish={onFinish} />
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
