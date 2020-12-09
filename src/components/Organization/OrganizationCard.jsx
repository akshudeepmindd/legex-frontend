import React from "react";
import PropTypes from "prop-types";
import { Card, Avatar, List, Typography, Badge, Button } from "antd";
import { useHistory } from "react-router-dom";
import {
  UserOutlined,
  FolderOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const OrganizationCard = ({ organization }) => {
  const history = useHistory();

  return (
    <Card
      style={{ border: "2px solid blue", borderRadius: 5 }}
      bordered={false}
      actions={[
        <Button
          type="primary"
          block
          icon={<EyeOutlined />}
          onClick={() =>
            history.push(`/dashboard/organizations/${organization._id}`)
          }
          style={{ maxWidth: "95%", marginBottom: 10 }}
        >
          View Organization
        </Button>,
      ]}
    >
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
          <Text>
            <UserOutlined />
            Admin
          </Text>
          <Text>
            {organization.owner.firstName} {organization.owner.lastName}
          </Text>
        </List.Item>

        <List.Item>
          <Text>
            <FolderOutlined />
            Cases
          </Text>
          <Badge
            count={organization.cases.length}
            style={{ backgroundColor: "#1F40E6" }}
            showZero
          />
        </List.Item>

        <List.Item>
          <Text>
            <UsergroupAddOutlined />
            Members
          </Text>
          <Badge
            count={organization.members.length}
            style={{ backgroundColor: "#1F40E6" }}
            showZero
          />
        </List.Item>
      </List>
    </Card>
  );
};

OrganizationCard.propTypes = {
  organization: PropTypes.object.isRequired,
};

export default OrganizationCard;
