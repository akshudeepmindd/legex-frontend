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

// const onFinish = (value) => {
//   console.log(value);
// };

const Manage = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => await dispatch(registerUser(values));
  return (
    <AdminDashboardLayout>
      <Form name="RegisterForm" className="form-group" onFinish={onFinish}>
        <Row gutter={[50, 20]}>
          <Col span={10}>
            <h3>Add a Neutral</h3>

            <Row>
              <Col span={6}>
                {" "}
                <label className="">First Name</label>
              </Col>

              <Col span={12}>
                <Form.Item name="firstName">
                  <Input placeholder="first name" className="text-feild" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {" "}
                <label className="">Last Name</label>
              </Col>

              <Col span={12}>
                <Form.Item name="lastName">
                  <Input placeholder="last name" className="text-feild" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {" "}
                <label className="">Phone</label>
              </Col>

              <Col span={12}>
                <Form.Item name="phone">
                  <Input placeholder="phone" className="text-feild" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {" "}
                <label className="">Email Id</label>
              </Col>

              <Col span={12}>
                <Form.Item name="email">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="text-feild"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {" "}
                <label className="">Password</label>
              </Col>

              <Col span={12}>
                <Form.Item name="password">
                  <Input.Password
                    placeholder="Password"
                    className="text-feild"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {" "}
                <label className="">Role</label>
              </Col>

              <Col span={12}>
                <Form.Item name="role">
                  <Input placeholder="role" className="text-feild" />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" block className="adamin">
              Create Admin
            </Button>
          </Col>
          <Col span={8}>
            <h3>Delete a Neutral</h3>
            <Select
              style={{ width: 200 }}
              showSearch
              placeholder="Neutral 1"
              onChange
            ></Select>
            <div>
              <Button type="primary" htmlType="submit" block className="adamin">
                Remove
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </AdminDashboardLayout>
  );
};

export default Manage;
