import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  PageHeader,
  Tag,
  Button,
  Descriptions,
  Card,
  Steps,
  List,
  Modal,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';

import { DashboardLayout } from '../../../layouts';
import { InviteForm } from '../../../components';

import { fetchCase } from '../../../store/actions/cases';

const { Step } = Steps;

const Case = ({ dispatch, loading, singleCase, error }) => {
  const [hearingModal, setHearingModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);

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
              <PageHeader
                ghost={false}
                title={singleCase.title}
                subTitle={<a href={singleCase.meetingUrl}>meeting url</a>}
                tags={<Tag color="blue">{singleCase.status}</Tag>}
                extra={[
                  <Button key="2">Create Hearing</Button>,
                  <Button key="1" type="primary">
                    Make Verdict
                  </Button>,
                ]}
              >
                <Descriptions size="small" column={3}>
                  <Descriptions.Item label="Description">
                    {singleCase.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Creation Time">
                    {new Date(singleCase.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Est Time">
                    {new Date(singleCase.updatedAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>
              </PageHeader>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card bordered={false} title="Case Timeline">
                <Steps size="small" current={1} status="error">
                  <Step title="Creation" />
                  <Step title="Invitations" />
                  <Step title="Assignment" />
                  <Step title="Hearings" />
                  <Step title="Completion" />
                </Steps>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Case Forum" />
        </Col>
      </Row>

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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

      <Modal
        title="Hearing Form"
        visible={hearingModal}
        onOk={handleOk}
        onCancel={handleCancel}
      />

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
      />
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
  singleCase: PropTypes.instanceOf(Array).isRequired,
  error: PropTypes.instanceOf(Object),
};

Case.defaultProps = {
  error: {},
};

export default connect(mapStateToProps)(Case);
