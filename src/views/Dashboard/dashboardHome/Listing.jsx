import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal } from "antd";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Plus from "../../../assets/images/plus.png";
import Union from "../../../assets/images/Union.png";

// import Modal from "antd/lib/modal/Modal";
import { fetchCases } from "../../../store/actions/cases";
import { fetchHearings } from "../../../store/actions/hearings";
import { fetchUser } from "../../../store/actions/user";
import { uploadDocument } from "../../../store/actions/documents";
import UploadForm from "../../../components/Document/UploadForm";

import { hearings2, documents, updates } from "../../../utils/constants";
const Listing = ({ dispatch, caseData, user, hearings }) => {
  const [hearing, sethearings] = useState(false);
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false);

  console.log(caseData, "datatat");
  const onDocumentUploadClick = async (formData) => {
    formData.append("creater", user._id);
    formData.append("createrType", "User");
    const res = await dispatch(uploadDocument(formData));
    setUploadFormVisibility(!res);
    dispatch(fetchUser());
    return res;
  };
  const userUpcomingHearing = () => {
    return user?.cases?.map((item) => {
      console.log(item, "hearingss");
      if (item?.hearings.length > 0) {
        sethearings(true);
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
  const download = (data) => {
    setTimeout(() => {
      const response = {
        file: data,
      };
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  };
  return (
    <div className="listingcontainer">
      <Modal
        title="Upload Document"
        visible={uploadFormVisbility}
        onCancel={() => setUploadFormVisibility(false)}
        footer={null}
        destroyOnClose={true}
      >
        <UploadForm onUpload={onDocumentUploadClick} />
      </Modal>
      <Row gutter={[48, 16]}>
        <Col span={12}>
          <Card bordered={true} className="upcoming-container d-contain">
            <Row className="upcoming">
              <h4>Upcoming hearings</h4>
              <Link to="/dashboard/appointments">view all</Link>
            </Row>
            {hearing ? userUpcomingHearing() : "No data found"}
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} className="document-container d-contain">
            <div
              style={{
                height: "180px",
                overflowY: "scroll",
              }}
            >
              <Row className="upcoming">
                <h4>Documents</h4>
                <img
                  src={Plus}
                  alt="plus"
                  onClick={() => setUploadFormVisibility(true)}
                />
                <Link to="/dashboard/documents">view all</Link>
              </Row>
              {user?.documents.map((docs, index) => {
                let classname = index % 2 == 0 ? "bg-grey" : "non-bg-grey";
                return (
                  <Row className={classname}>
                    <Col span={12} className="documentText mt-2">
                      {docs.name}
                    </Col>
                    <Col span={12} className="download">
                      <img src={docs.url} height="100" width="100" />
                      <img
                        src={Union}
                        alt="download"
                        className="space3"
                        onClick={() => download(docs.url)}
                      />
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card bordered={false} className="document-container">
            <Row className="upcoming">
              <h3>Updates</h3>
            </Row>
            {caseData?.map((docs, index) => {
              let classname = index % 2 == 0 ? "bg-grey" : "non-bg-grey";
              return (
                <Row key={docs?._id} className={classname}>
                  <Col span={5} className="documentText">
                    {moment(docs?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </Col>
                  <Col span={5}>
                    {docs?.organizations.length > 0
                      ? docs?.organizations[0].name
                      : "-"}
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
              );
            })}
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
