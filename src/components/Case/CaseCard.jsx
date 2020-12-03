import React from 'react';
import { Card, List, Typography, Tag, Badge, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  UsergroupAddOutlined,
  EyeOutlined,
  CalendarOutlined,
  BranchesOutlined,
} from '@ant-design/icons';

const { Paragraph } = Typography;

const CaseCard = ({ data }) => {
  const history = useHistory();
  return (
    <Card
      title={
        <List>
          <List.Item>
            <Typography.Text>{data.title}</Typography.Text>
            <Tag color="blue">{data.status}</Tag>
          </List.Item>
        </List>
      }
      bordered={false}
      actions={[
        <Button
          type="primary"
          block
          icon={<EyeOutlined />}
          onClick={() => history.push(`/dashboard/cases/${data._id}`)}
        >
          View Case
        </Button>,
      ]}
    >
      <Paragraph>{data.description}</Paragraph>
      <List>
        <List.Item>
          <Typography.Text>
            <BranchesOutlined /> Type
          </Typography.Text>
          <Typography.Text>{data.caseType.name}</Typography.Text>
        </List.Item>
        <List.Item>
          <Typography.Text>
            <CalendarOutlined /> Hearings
          </Typography.Text>
          <Badge
            count={data.hearings.length}
            style={{ backgroundColor: '#1F40E6' }}
            showZero
          />
        </List.Item>
        <List.Item>
          <Typography.Text>
            <UsergroupAddOutlined /> Members
          </Typography.Text>
          <Badge
            count={data.members.length + data.organizations.length}

            style={{ backgroundColor: '#1F40E6' }}
            showZero
          />
        </List.Item>
      </List>
    </Card>
  );
};

CaseCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};

export default CaseCard;
