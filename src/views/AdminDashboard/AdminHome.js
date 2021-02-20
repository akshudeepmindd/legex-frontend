import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Card, Select, Button, Input } from "antd";
import { connect } from "react-redux";
import UserAvatar from "../../assets/images/useravtar.png";
import Plus from "../../assets/images/plus.png";
import { createCase } from "../../store/actions/cases";
// import { CaseCard, CasesTable, CaseForm } from "../../../components";
import { useHistory } from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const statusMenue = [
  { id: 1, statusName: "completion" },
  { id: 2, statusName: "creation" },
  { id: 3, statusName: "invitations" },
  { id: 4, statusName: "assignment" },
  { id: 5, statusName: "hearings" },
  { id: 6, statusName: "Suspended" },
];
const UserProfile = ({ dispatch, cases, user }) => {
  const [modal, setModal] = useState(false);
  const [selectCaseStatus, setSelectCaseStatus] = useState("");
  const history = useHistory();

  const onChangeOrg = (value) => {
    setSelectCaseStatus(value);
  };
  // useEffect(() => {
  //   async function fetchDataAdmin() {
  //     await dispatch(fetchCasesAdmin());
  //   }
  //   fetchDataAdmin();
  // }, [dispatch]);
  const filterCase = cases?.filter((item) => item.status === selectCaseStatus);

  return (
    <AdminDashboardLayout>
      <Row>
        <Col span={12} className="userprofile">
          <Row>
            <img src={UserAvatar} alt="avatar" />
          </Row>
        </Col>
      </Row>
      <div className="addcase">
        <Row>
          {" "}
          <h3>Cases</h3>
          <Select placeholder="Select Case Status" onChange={onChangeOrg}>
            {statusMenue?.length > 0
              ? statusMenue?.map((item, index) => (
                  <Select.Option value={item.statusName} key={index}>
                    {item.statusName}
                  </Select.Option>
                ))
              : "null"}
          </Select>
        </Row>
        <div>
          {" "}
          <Input type="text" placeholder="Search" value="" />
        </div>
      </div>
      {selectCaseStatus ? (
        filterCase.length > 0 ? (
          <Row gutter={[48, 16]}>
            {filterCase.map((item, index) => (
              <Col span={8} key={index}>
                <Card
                  bordered={false}
                  className="document-container border-crd"
                >
                  <div className="review">
                    <div className="d-flex">
                      {item.members?.map((item, index) => (
                        <span>
                          {index ? " Vs " : ""} {item.firstName} {item.lastName}
                        </span>
                      ))}
                      <Button
                        type="primary"
                        className={
                          item.status === "completion"
                            ? "complete-btn"
                            : "review-btn"
                        }
                        onClick={() =>
                          history.push(`/dashboard/cases/${item._id}`)
                        }
                        block
                      >
                        {item.status}
                      </Button>
                    </div>

                    <p>{item.caseType?.name}</p>
                    <p>Expected Date of Resolve : 8 Jan 2021</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          "no case avelable"
        )
      ) : cases?.length > 0 ? (
        <Row gutter={[48, 16]}>
          {cases?.map((item, index) => (
            <Col span={8} key={index}>
              <Card bordered={false} className="document-container border-crd">
                <div className="review">
                  <div className="d-flex">
                    <div>
                      {item?.members.map((item, index) => (
                        <span>
                          {index ? " Vs " : ""} {item.firstName} {item.lastName}
                        </span>
                      ))}
                    </div>
                    <Button
                      type="primary"
                      className={
                        item?.status === "completion"
                          ? "complete-btn"
                          : "review-btn"
                      }
                      onClick={() =>
                        history.push(`/dashboard/cases/${item?._id}`)
                      }
                      block
                    >
                      {item?.status}
                    </Button>
                  </div>

                  <p>{item?.caseType.name}</p>
                  <p>Expected Date of Resolve : 8 Jan 2021</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        "no case avalable"
      )}
    </AdminDashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  cases: state.adminCaseDetail,
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
