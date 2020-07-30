import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ant design components
import {
  Row,
  Col,
  PageHeader,
  Modal,
  Button,
  Card,
  Empty,
  Typography,
} from 'antd';
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';

// components
import { DashboardLayout } from '../../../layouts';
import { CaseCard, CasesTable, CaseForm } from '../../../components';

// redux actions
import { fetchCases } from '../../../store/actions/cases';
import { fetchCaseTypes } from '../../../store/actions/caseTypes';

const { Text } = Typography;

const CasesList = ({ dispatch, loading, cases, caseTypes }) => {
  // create state
  const [view, setView] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCaseTypes());
  }, [dispatch]);

  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const toggleView = () => {
    setView(!view);
  };

  const onFinish = (values) => {};

  const handleChange = () => {};

  const renderCases = () => {
    if (cases.length > 0) {
      if (view) {
        return (
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {cases.map((data) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <CaseCard data={data} />
              </Col>
            ))}
          </Row>
        );
      }
      return <CasesTable cases={cases} loading={loading} />;
    }
    return (
      <Card bordered={false}>
        <Empty description={<Text>No Cases Found</Text>} />
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Cases"
            subTitle="Manage all your cases"
            extra={[
              <Button
                key="2"
                icon={view ? <TableOutlined /> : <AppstoreOutlined />}
                onClick={toggleView}
              />,
              <Button key="1" type="primary" onClick={showModal}>
                Create a new case
              </Button>,
            ]}
          />
        </Col>
      </Row>

      {renderCases()}

      <Modal
        title="Case Form"
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CaseForm
          onFinish={onFinish}
          handleChange={handleChange}
          caseTypes={caseTypes}
        />
      </Modal>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.cases.loading,
  cases: state.cases.cases,
  caseTypes: state.caseTypes.caseTypes,
  error: state.cases.error,
});

CasesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Object),
  cases: PropTypes.instanceOf(Array),
  caseTypes: PropTypes.instanceOf(Array),
};

CasesList.defaultProps = {
  error: {},
  cases: [],
  caseTypes: [],
};

export default connect(mapStateToProps)(CasesList);
