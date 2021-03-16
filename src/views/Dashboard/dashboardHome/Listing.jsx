import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Plus from "../../../assets/images/plus.png";
import Union from "../../../assets/images/Union.png";
import { fetchCases } from "../../../store/actions/cases";
import { fetchHearings } from "../../../store/actions/hearings";

import { hearings2, documents, updates } from "../../../utils/constants";
const Listing = ({ dispatch, caseData, hearings }) => {
  // useEffect(() => {
  //   dispatch(fetchHearings());
  // }, [dispatch]);
  const userUpcomingHearing = () => {
    return caseData?.map((item) => {
      if (item?.hearings.length > 0) {
        return item.hearings?.map((item) => {
          if (
            moment(item.startDateTime).format("MMMM Do YYYY, h:mm:ss a") >=
            moment().format("MMMM Do YYYY, h:mm:ss a")
          ) {
            return (
              <Row key={item.id}>
                <Col span={12} className="documentText">
                  {moment(item.startDateTime).format("MMMM Do YYYY, h:mm:ss a")}
                </Col>
                <Col span={8}>{item?.case?.title}</Col>
                {/* <Col span={8} className="download">
                  <Link to="#">{hear.join}</Link>
                </Col> */}
              </Row>
            );
          }
        });
      }
    });
  };

  console.log(caseData, "caseData");
  // console.log(userUpcomingHearing(), "hearings");

  return (
    <div className="listingcontainer">
      <Row gutter={[48, 16]}>
        <Col span={12}>
          <Card bordered={true} className="upcoming-container d-contain">
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
        <Col span={12}>
          <Card bordered={false} className="document-container d-contain">
            <Row className="upcoming">
              <h4>Documents</h4>
              <img src={Plus} alt="plus" />
              <Link to="#">view all</Link>
            </Row>
            {documents.map((docs) => (
              <Row>
                <Col span={12} className="documentText">
                  {docs.name}
                </Col>
                <Col span={12} className="download">
                  Image <img src={Union} alt="download" />
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card bordered={false} className="document-container">
            <Row className="upcoming">
              <h3>Updates</h3>
            </Row>
            {caseData?.map((docs) => (
              <Row key={docs?._id}>
                <Col span={5} className="documentText">
                  {moment(docs?.updatedAt).format("DD-MM-YYYY, HH:mm a")}
                </Col>
                <Col span={5}>
                  {docs?.organizations.length > 0
                    ? docs?.organizations[0].name
                    : "null"}
                </Col>
                <Col span={8}>
                  <Row>
                    {docs?.members.length > 0
                      ? docs?.members.map((item, index) => (
                          <Col key={index}>
                            {(index ? " Vs " : "") +
                              item.firstName +
                              " " +
                              item.lastName}
                          </Col>
                        ))
                      : "null"}
                  </Row>
                </Col>
                <Col span={6} className="download2">
                  {docs?.caseType.name}
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  caseData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
  hearings: state.hearings,
});

export default connect(mapStateToProps)(Listing);
