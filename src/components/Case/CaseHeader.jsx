import React from 'react';
import { PageHeader, Tag, Button, Descriptions } from 'antd';
import PropTypes from 'prop-types';

const CaseHeader = ({ singleCase, showVerdictModal }) => {
  return (
    <PageHeader
      ghost={false}
      title={singleCase.title}
      subTitle={<a href={singleCase.meetingUrl}>meeting url</a>}
      tags={<Tag color="blue">{singleCase.status}</Tag>}
      extra={[
        <Button key="2">Suspend case</Button>,
        <Button key="1" type="primary" onClick={showVerdictModal}>
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
  );
};

CaseHeader.propTypes = {
  showVerdictModal: PropTypes.func.isRequired,
  singleCase: PropTypes.instanceOf(Object).isRequired,
};

export default CaseHeader;
