import React, { useState } from "react";
import { Row, Col, Modal, Card } from "antd";
import { Link } from "react-router-dom";

import moment from "moment";
import { connect } from "react-redux";
import UserAvatar from "../../../assets/images/useravtar.png";
import Plus from "../../../assets/images/plus.png";
import { createCase } from "../../../store/actions/cases";
import { CaseCard, CasesTable, CaseForm } from "../../../components";
import { useHistory } from "react-router-dom";
const UserProfile = ({ dispatch, caseData, user, caseTypes }) => {
  const [modal, setModal] = useState(false);

  const history = useHistory();

  const showModal = () => {
    setModal(true);
  };

  const resolvedCases = user?.cases?.filter(
    (item) => item?.status === "completion"
  );
  const onFinish = async (values) => {
    const response = await dispatch(
      createCase({ createrType: "User", creater: user._id, ...values })
    );
    setModal(false);
    return response;
  };
  const pendingCases = user?.cases?.filter(
    (item) => item?.status !== "completion"
  );
  const userUpcomingHearing = () => {
    return (
      <div
        style={{
          height: 164,
          overflowY: "scroll",
        }}
      >
        {user?.cases?.map((item1) => {
          if (item1?.hearings?.length > 0) {
            return item1.hearings?.map((item) => {
              if (
                moment(item.startDateTime).format("MMMM Do YYYY, h:mm:ss a") >=
                moment().format("MMMM Do YYYY, h:mm:ss a")
              ) {
                return (
                  <Row key={item.id}>
                    <Col span={12} className="documentText">
                      {moment(item.startDateTime).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Col>
                    <Col span={8}>{item?.remark}</Col>
                    <Col span={4} className="download">
                      <a href={item1?.meetingUrl} target="_blank">
                        Join
                      </a>
                    </Col>
                  </Row>
                );
              }
            });
          }
        })}
      </div>
    );
  };
  return (
    <>
      <Row>
        <Col span={12} className="userprofile">
          <Row>
            <img
              src={user?.profilePic ? user?.profilePic : UserAvatar}
              alt="avatar"
            />
            <p>{`Welcome, ${user.firstName} ${user.lastName}`}</p>
          </Row>
        </Col>
        {/* <Col span={12} className='pluscase'>
          <Row className='plus-row'>
            <img
              src={Plus}
              alt='plus'
              onClick={() => history.push(`/dashboard/caseForm`)}
            />
            <p>Add Case</p>
          </Row>
        </Col> */}
      </Row>
      <Row className="case-number-row case-Row">
        <Col span={10}>
          <Col span={10} className="dispute">
            <p>NO. OF DISPUTES</p>
            <p>{user?.cases?.length > 0 ? user?.cases?.length : "0"}</p>
          </Col>
          <Col span={10} className="resolve">
            <p>RESOLVED CASES</p>
            <p>{resolvedCases ? resolvedCases.length : "0"}</p>
          </Col>
          <Col span={10} className="pending">
            <p>PENDING CASES</p>
            <p>{pendingCases ? pendingCases.length : "0"}</p>
          </Col>
        </Col>
        <Col span={12}>
          {" "}
          <Card bordered={true} className="upcoming-container">
            <Row className="upcoming">
              <h4>Upcoming hearings</h4>
              <Link to="#">view all</Link>
            </Row>
            {userUpcomingHearing()}
            {/* {hearings2.map((hear) => (
              <>
                <p className="month">{hear.month}</p>
                <Row>
                  <Col span={8} className="documentText">
                    {hear.time}
                  </Col>
                  <Col span={8}>{hear.name}</Col>
                  <Col span={8} className="download">
                    <Link to="#">{hear.join}</Link>
                  </Col>
                </Row>
              </>
            ))} */}
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  caseData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
  hearings: state.hearings,
  caseTypes: state.caseTypes.caseTypes,
});

export default connect(mapStateToProps)(UserProfile);
