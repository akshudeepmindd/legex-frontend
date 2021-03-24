import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
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

  const resolvedCases = caseData?.filter(
    (item) => item?.status === "completion"
  );
  const onFinish = async (values) => {
    const response = await dispatch(
      createCase({ createrType: "User", creater: user._id, ...values })
    );
    setModal(false);
    return response;
  };
  const pendingCases = caseData?.filter(
    (item) => item?.status !== "completion"
  );

  return (
    <>
      <Row>
        <Col span={12} className="userprofile">
          <Row>
            <img src={UserAvatar} alt="avatar" />
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
      <Row className="case-number-row">
        <Col span={8} className="dispute">
          <p>NO. OF DISPUTES</p>
          <p>{caseData?.length > 0 ? caseData?.length : "0"}</p>
        </Col>
        <Col span={8} className="resolve">
          <p>RESOLVED CASES</p>
          <p>{resolvedCases ? resolvedCases.length : "0"}</p>
        </Col>
        <Col span={8} className="pending">
          <p>PENDING CASES</p>
          <p>{pendingCases ? pendingCases.length : "0"}</p>
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
