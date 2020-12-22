import React from "react";
import { Row, Col, PageHeader, Button, Card } from "antd";

import { DashboardLayout } from "../../../layouts";
import DocumentsTable from "../../../components/Document/DocumentsTable";
import { connect } from "react-redux";
import UploadForm from "../../../components/Document/UploadForm";
import { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { uploadDocument } from "../../../store/actions/documents";

const DocumentsList = ({ user, history, dispatch }) => {
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false);
  const onDocumentUploadClick = async (formData) => {
    formData.append("creater", user._id);
    formData.append("createrType", "User");
    const res = await dispatch(uploadDocument(formData));
    setUploadFormVisibility(!res);
    return res;
  };

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
                  <Row
                    gutter={[
                      { xs: 8, sm: 12, md: 12, lg: 12 },
                      { xs: 8, sm: 0, md: 0, lg: 0 },
                    ]}
                  >
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
          <Card>
            <DocumentsTable documents={user.documents} />
          </Card>

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
