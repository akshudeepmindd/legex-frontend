import React from 'react';
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

function Sidebar() {
  return (
    <div className="sidebar">
      <Menu theme="dark" mode="inline">
        <Menu.Item key="/dashboard/overview" icon={<HomeOutlined />}>
          <Link to="/dashboard/overview">Home</Link>
        </Menu.Item>
        <Menu.Item key="/dashboard/appointments" icon={<CalendarOutlined />}>
          <Link to="/dashboard/appointments">Appointments</Link>
        </Menu.Item>
        <Menu.Item key="/dashboard/organizations" icon={<ApartmentOutlined />}>
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
        <Menu.Item key="/dashboard/help" icon={<InfoCircleOutlined />}>
          <Link to="/dashboard/help">Help</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
