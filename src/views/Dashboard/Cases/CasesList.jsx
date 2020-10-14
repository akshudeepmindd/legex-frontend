import React, { useState } from "react";
import { connect } from "react-redux";

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
} from "antd";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";

// components
import { DashboardLayout } from "../../../layouts";
import { CaseCard, CasesTable, CaseForm } from "../../../components";

// redux actions
import { createCase } from "../../../store/actions/cases";

const { Text } = Typography;

const CasesList = ({
  dispatch,
  loading,
  cases,
  caseTypes,
  organizations,
  user,
}) => {
  // create state
  const [view, setView] = useState(false);
  const [modal, setModal] = useState(false);

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

  const onFinish = async (values) =>
    await dispatch(
      createCase({ createrType: "User", creater: user._id, ...values })
    );

  const renderCases = () => {
    console.log(cases);
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
      {cases && caseTypes && organizations ? (
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
            <CaseForm onFinish={onFinish} caseTypes={caseTypes} />
          </Modal>
        </>
      ) : null}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
});

export default connect(mapStateToProps)(CasesList);
