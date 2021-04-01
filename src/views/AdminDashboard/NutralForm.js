import React, { useState } from "react";
import { Row, Col, Modal, Card, Select, Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import UserAvatar from "../../assets/images/useravtar.png";
import Plus from "../../assets/images/plus.png";
import { createCase } from "../../store/actions/cases";
// import { CaseCard, CasesTable, CaseForm } from "../../../components";
import { useHistory } from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { registerUser } from "../../store/actions/auth";
import DeleteNutral from "./DeleteNutral";

const NutralForm = ({ onFinish, setData, data }) => {
  const dispatch = useDispatch();

  // const onSubmitClick = async (values) => {
  //   setLoading(true);
  //   await onFinish(values);
  //   setLoading(false);
  // };

  return (
    <Form
      name="RegisterForm"
      className="form-group form-register"
      onFinish={() => onFinish()}
    >
      <Row>
        <Col span={6}>
          {" "}
          <label className="">First Name</label>
        </Col>

        <Col span={18}>
          <Form.Item name="firstName">
            <Input
              placeholder="first name"
              className="text-feild"
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          {" "}
          <label className="">Last Name</label>
        </Col>

        <Col span={18}>
          <Form.Item name="lastName">
            <Input
              placeholder="last name"
              className="text-feild"
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          {" "}
          <label className="">Phone</label>
        </Col>

        <Col span={18}>
          <Form.Item name="phone">
            <Input
              placeholder="phone"
              className="text-feild"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          {" "}
          <label className="">Email Id</label>
        </Col>

        <Col span={18}>
          <Form.Item name="email">
            <Input
              type="email"
              placeholder="Email"
              className="text-feild"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          {" "}
          <label className="">Password</label>
        </Col>

        <Col span={18}>
          <Form.Item name="password">
            <Input.Password
              placeholder="Password"
              className="text-feild"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          {" "}
          <label className="">Role</label>
        </Col>

        <Col span={18}>
          <Form.Item name="role">
            <Input
              placeholder="role"
              className="text-feild"
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="button-div">
        <Button type="primary" htmlType="submit" block className="adamin">
          Create Netural
        </Button>
      </div>
    </Form>
  );
};

export default NutralForm;
