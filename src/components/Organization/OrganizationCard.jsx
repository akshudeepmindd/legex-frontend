import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, List, Space, Badge } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  FolderOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const OrganizationCard = ({ organization }) => {
  return (
    <Link to={`/organizations/${organization._id}`}>
      <Card bordered={false}>
        <Meta
          avatar={
            <Avatar
              size={64}
              icon={<UserOutlined />}
              className="avatar-placeholder"
              shape="square"
            />
          }
          title={organization.name}
          description={<p>{organization.domain}</p>}
        />

        <List>
          <List.Item>
            <Space>
              <UserOutlined />
              <span>
                {organization.owner.firstName} {organization.owner.lastName}
              </span>
            </Space>
          </List.Item>

          <List.Item>
            <Space>
              <FolderOutlined />
              Cases{' '}
              <Badge
                count={organization.cases.length}
                style={{ backgroundColor: '#1F40E6' }}
                showZero
              />
            </Space>
          </List.Item>

          <List.Item>
            <Space>
              <UsergroupAddOutlined />
              Members{' '}
              <Badge
                count={organization.members.length}
                style={{ backgroundColor: '#1F40E6' }}
                showZero
              />
            </Space>
          </List.Item>
        </List>
      </Card>
    </Link>
  );
};

OrganizationCard.propTypes = {
  organization: PropTypes.instanceOf(Object).isRequired,
};

export default OrganizationCard;
