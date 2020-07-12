import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  ApartmentOutlined,
  FolderOutlined,
  WalletOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Menu theme="dark" mode="inline">
          <Menu.Item key="/dashboard/overview" icon={<HomeOutlined />}>
            <Link to="/dashboard/overview">Home</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/activities" icon={<CalendarOutlined />}>
            <Link to="/dashboard/activities">Activities</Link>
          </Menu.Item>
          <Menu.Item
            key="/dashboard/organizations"
            icon={<ApartmentOutlined />}
          >
            <Link to="/dashboard/organizations">Organizations</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/documents" icon={<FolderOutlined />}>
            <Link to="/dashboard/documents">Documents</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/cases" icon={<WalletOutlined />}>
            <Link to="/dashboard/cases">Cases</Link>
          </Menu.Item>
        </Menu>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="/dashboard/settings" icon={<SettingOutlined />}>
            <Link to="/dashboard/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <Link to="">Help</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Sidebar;
