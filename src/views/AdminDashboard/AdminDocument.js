import React from "react";
import {
  Row,
  Col,
  PageHeader,
  Button,
  Card,
  Menu,
  Dropdown,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { AdminDashboardLayout } from "../../layouts";
import DocumentsTable from "../../components/Document/DocumentsTable";
import { connect } from "react-redux";
import UploadForm from "../../components/Document/UploadForm";
import { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { uploadDocument } from "../../store/actions/documents";
import { DownOutlined } from "@ant-design/icons";
import PDF from "../../assets/images/Document upload icon.png";

const styles = {
  text: {
    textTransform: "capitalize",
  },
};
const AdminDocumentsList = ({
  user,
  history,
  dispatch,
  documents,
  organizations,
  organization,
}) => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false);
  const onDocumentUploadClick = async (formData) => {
    formData.append("creater", user._id);
    formData.append("createrType", "User");
    const res = await dispatch(uploadDocument(formData));
    setUploadFormVisibility(!res);
    return res;
  };
  const onChangeOrg = (value) => {
    setSelectedOrg(value);
  };

  const filterOrganization = organizations?.find(
    (item) => item._id === selectedOrg
  );

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
  console.log(filterOrganization, "filterOrganization");

  return (
    <AdminDashboardLayout>
      {
        <>
          {/* <Row
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
          </Modal> */}
          <Row>
            <Col flex="1 1 400px">
              <Select
                style={{ width: 200 }}
                placeholder="Select a Organization"
                onChange={onChangeOrg}
              >
                {organizations?.length > 0
                  ? organizations?.map((item, index) => (
                      <Select.Option value={item._id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))
                  : "null"}
              </Select>

              <div className="address">
                <div className="org-industry">
                  <label>Industry:</label>
                  <span style={styles.text}>
                    {" "}
                    {filterOrganization
                      ? filterOrganization?.domain
                      : organization?.domain}
                  </span>
                </div>
                <div>
                  <label>Owner: </label>
                  <span style={styles.text}>
                    {" "}
                    {filterOrganization
                      ? filterOrganization?.owner.firstName
                      : organization?.owner.firstName}{" "}
                    {filterOrganization
                      ? filterOrganization?.owner.lastName
                      : organization?.owner.lastName}
                  </span>
                </div>
                <div>
                  <label>CIN: </label>
                  <span className=""> U7012PTC2022IN123456</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="pdf-image">
            {filterOrganization
              ? filterOrganization.documents.length > 0
                ? filterOrganization.documents.map((docs) => (
                    <Col span={3}>
                      <Link
                        to="#"
                        target="_blank"
                        // onClick={() => download(docs.url)}
                      >
                        <img src={PDF} onClick={() => download(docs.url)} />
                      </Link>
                    </Col>
                  ))
                : "No Documents Found"
              : organization?.documents.length > 0
              ? organization?.documents.map((docs) => (
                  <Col span={3}>
                    <Link
                      to="#"
                      target="_blank"
                      // onClick={() => download(docs.url)}
                    >
                      <img src={PDF} onClick={() => download(docs.url)} />
                    </Link>
                  </Col>
                ))
              : "No Documents Found"}
          </Row>
        </>
      }
    </AdminDashboardLayout>
  );
};

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  user: state.user,
  documents: state.documents,
  organizations: state.organizations,
  organization: state.organization,
});
export default connect(mapStateToProps)(AdminDocumentsList);
