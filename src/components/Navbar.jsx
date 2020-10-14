import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo.png';

function Navbar() {
  return (
    <nav className="menu">
      <Link to="/">
        <img src={Logo} alt="Legex" className="logo" />
      </Link>
      <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
        <Menu.Item key="/how-we-help-you">
          <Link to="/how-we-help-you">How we help you</Link>
        </Menu.Item>
        <Menu.Item key="/our-services">
          <Link to="/our-services">Our services</Link>
        </Menu.Item>
        <Menu.Item key="/our-people">
          <Link to="/our-people">Our people</Link>
        </Menu.Item>
        <Menu.Item key="/our-clients">
          <Link to="/our-clients">Our clients</Link>
        </Menu.Item>
      </Menu>

      <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="/register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default Navbar;
