import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Card, Select, Button, Input } from "antd";
import { connect } from "react-redux";
import UserAvatar from "../../assets/images/useravtar.png";
import Plus from "../../assets/images/plus.png";
import { updateCseAdmin } from "../../store/actions/adminAction";
import { fetchUserList } from "../../store/actions/adminUsers";
// import { CaseCard, CasesTable, CaseForm } from "../../../components";
import { useHistory } from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import AssignForm from "./AssignForm";

const statusMenue = [
  { id: 1, statusName: "completion" },
  { id: 2, statusName: "creation" },
  { id: 3, statusName: "invitations" },
  { id: 4, statusName: "assignment" },
  { id: 5, statusName: "hearings" },
  { id: 6, statusName: "Suspended" },
];
const UserProfile = ({ dispatch, cases, users, selectId }) => {
  const [modal, setModal] = useState(false);
  const [selectCaseStatus, setSelectCaseStatus] = useState("");
  const [selectCase, setSelectCase] = useState("");
  const history = useHistory();

  const onChangeOrg = (value) => {
    setSelectCaseStatus(value);
  };

  const onAssignFinish = async (values) =>
    (await dispatch(
      updateCseAdmin({
        _id: selectCase,
        ...values,
      })
    )) && setModal(false);

  const filterCase = cases?.filter((item) => item.status === selectCaseStatus);

  return (
    <>
      <Modal
        title="Assign Form"
        visible={modal}
        onFinish={onAssignFinish}
        onCancel={() => setModal(false)}
        destroyOnClose={true}
        footer={null}
      >
        <AssignForm onFinish={onAssignFinish} selectCaseId={selectCase} />
      </Modal>
      <AdminDashboardLayout>
        <Row>
          <Col span={12} className="userprofile">
            <Row>
              <img src={UserAvatar} alt="avatar" />
            </Row>
          </Col>
        </Row>

        <Row gutter={[48, 16]}>
          <Col flex={8}>
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
          </Col>
          <Col>
            {" "}
            <Input type="text" placeholder="Search" value="" />
          </Col>
        </Row>
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
                            {index ? " Vs " : ""} {item.firstName}{" "}
                            {item.lastName}
                          </span>
                        ))}
                        {item.mediator ? (
                          <Button
                            value={item._id}
                            type="primary"
                            className="complete-btn"
                            onClick={() => {
                              setSelectCase(item._id);
                              setModal(!modal);
                            }}
                            block
                          >
                            Change Neutral
                          </Button>
                        ) : (
                          <Button
                            value={item._id}
                            type="primary"
                            className="complete-btn"
                            onClick={() => {
                              setSelectCase(item._id);
                              setModal(!modal);
                            }}
                            block
                          >
                            Assign to
                          </Button>
                        )}
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
                <Card
                  bordered={false}
                  className="document-container border-crd"
                >
                  <div className="review">
                    <div className="d-flex">
                      <div>
                        {item?.members.map((item, index) => (
                          <span>
                            {index ? " Vs " : ""} {item.firstName}{" "}
                            {item.lastName}
                          </span>
                        ))}
                      </div>
                      {item.mediator ? (
                        <Button
                          value={item._id}
                          type="primary"
                          className="complete-btn"
                          onClick={() => {
                            setSelectCase(item._id);
                            setModal(!modal);
                          }}
                          block
                        >
                          Change Neutral
                        </Button>
                      ) : (
                        <Button
                          value={item._id}
                          type="primary"
                          className="complete-btn"
                          onClick={() => {
                            setSelectCase(item._id);
                            setModal(!modal);
                          }}
                          block
                        >
                          Assign to
                        </Button>
                      )}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  cases: state.adminCaseDetail,
  users: state.adminUsers,
});

export default connect(mapStateToProps)(UserProfile);
