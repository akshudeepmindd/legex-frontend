import React from "react";
import { Row, Col, PageHeader, Button } from "antd";

import { DashboardLayout } from "../../../layouts";
import HearingsTable from "../../../components/Hearing/HearingTable";
import { connect } from "react-redux";
import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

const DocumentsList = ({ user, history, dispatch }) => {

  return (
    <DashboardLayout>
      {user ? (
        <>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <PageHeader
                ghost={false}
                onBack={() => history.push("/dashboard/overview")}
                title="Documents"
                extra={
                  <Row>
                    <Col>
                      <Button onClick={() => setUploadFormVisibility(true)}>
                        Upload
                      </Button>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
          <DocumentsTable documents={user.documents} />

          <Modal
            title="Upload Document"
            visible={uploadFormVisbility}
            onCancel={() => setUploadFormVisibility(false)}
            footer={null}
            destroyOnClose={true}
          >
            <UploadForm onUpload={onDocumentUploadClick} />
          </Modal>
        </>
      ) : (
        "loading"
      )}
    </DashboardLayout>
  );
};

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  user: state.user,
});
export default connect(mapStateToProps)(DocumentsList);
