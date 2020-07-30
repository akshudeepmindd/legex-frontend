import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Steps,
  List,
  Modal,
  Comment,
  Avatar,
} from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams, Link } from 'react-router-dom';

import { DashboardLayout } from '../../../layouts';
import {
  CaseHeader,
  InviteForm,
  DocumentForm,
  HearingForm,
  VerdictForm,
} from '../../../components';
import { fetchCase } from '../../../store/actions/cases';

const { Step } = Steps;

const Case = ({ dispatch, loading, singleCase, error }) => {
  const [hearingModal, setHearingModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);
  const [verdictModal, setVerdictModal] = useState(false);

  const { caseId } = useParams();

  useEffect(() => {
    dispatch(fetchCase(caseId));
  }, [dispatch, caseId]);

  const showHearingModal = () => {
    setHearingModal(true);
  };

  const showInviteModal = () => {
    setInviteModal(true);
  };

  const showDocumentModal = () => {
    setDocumentModal(true);
  };

  const showVerdictModal = () => {
    setVerdictModal(true);
  };

  const handleOk = (e) => {
    setHearingModal(false);
    setInviteModal(false);
    setDocumentModal(false);
  };

  const handleCancel = (e) => {
    setHearingModal(false);
    setInviteModal(false);
    setDocumentModal(false);
  };

  return (
    <DashboardLayout>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <CaseHeader
                singleCase={singleCase}
                showVerdictModal={showVerdictModal}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row
                gutter={[
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                ]}
              >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card bordered={false} title="Case Timeline">
                    <Steps
                      size="small"
                      current={1}
                      status="error"
                      direction="vertical"
                    >
                      <Step title="Creation" />
                      <Step title="Invitations" />
                      <Step title="Assignment" />
                      <Step title="Hearings" />
                      <Step title="Completion" />
                    </Steps>
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Row
                    gutter={[
                      { xs: 8, sm: 16, md: 24, lg: 32 },
                      { xs: 8, sm: 16, md: 24, lg: 32 },
                    ]}
                  >
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Card
                        bordered={false}
                        title="Case Parties"
                        actions={[
                          <Button
                            icon={<EditOutlined />}
                            block
                            type="primary"
                            onClick={showInviteModal}
                          >
                            Send Invite
                          </Button>,
                        ]}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Card
                        bordered={false}
                        title="Case Documents"
                        actions={[
                          <Button
                            icon={<EditOutlined />}
                            block
                            type="primary"
                            onClick={showDocumentModal}
                          >
                            Add Document
                          </Button>,
                        ]}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Card
                        bordered={false}
                        title="Case Hearing"
                        actions={[
                          <Button
                            icon={<EditOutlined />}
                            block
                            type="primary"
                            onClick={showHearingModal}
                          >
                            Create Hearing
                          </Button>,
                        ]}
                      >
                        <List>
                          <List.Item />
                        </List>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Case Forum" bordered={false} style={{ height: '80vh' }}>
            <Comment
              actions={[<span key="comment-basic-reply-to">Reply to</span>]}
              author={<Link to="/s">Han Solo</Link>}
              avatar={
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  className="avatar-placeholder"
                  shape="square"
                />
              }
              content={
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              datetime={new Date(singleCase.createdAt).toLocaleDateString()}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Hearing Form"
        visible={hearingModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <HearingForm />
      </Modal>

      <Modal
        title="Invite Form"
        visible={inviteModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InviteForm />
      </Modal>

      <Modal
        title="Document Form"
        visible={documentModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DocumentForm />
      </Modal>

      <Modal
        title="Verdict Form"
        visible={verdictModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <VerdictForm />
      </Modal>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.cases.loading,
  singleCase: state.cases.singleCase,
  error: state.cases.error,
});

Case.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  singleCase: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.instanceOf(Object),
};

Case.defaultProps = {
  error: {},
};

export default connect(mapStateToProps)(Case);
