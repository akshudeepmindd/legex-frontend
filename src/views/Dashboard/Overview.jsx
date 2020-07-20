import React from 'react';
import { Row, Col, Card, Avatar, Comment, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { DashboardLayout } from '../../layouts';
import { ProfileForm, CasesTable } from '../../components';

const { Meta } = Card;

function Overview({ messages }) {
  return (
    <DashboardLayout>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        justify="center"
        align="top"
      >
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card>
            <div />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card bordered={false}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  shape="square"
                  className="avatar-placeholder"
                  icon={<UserOutlined />}
                />
              }
              title="John Doe"
              description={
                <>
                  <p>johndoe@mail.com</p>
                  <p>0716560444</p>
                </>
              }
            />

            <ProfileForm />
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <Card title="All Cases">
            <CasesTable />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <Card bordered={false} title="Messages">
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message) => (
                <li>
                  <Comment
                    actions={message.actions}
                    author={message.author}
                    avatar={message.avatar}
                    content={message.content}
                    datetime={message.datetime}
                  />
                </li>
              )}
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default Overview;
