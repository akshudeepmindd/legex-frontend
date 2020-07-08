import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="menu">
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="/how-we-help-you">
            <Link to="/how-we-help-you">How we help you</Link>
          </Menu.Item>
          <Menu.Item key="/our-services"><Link to="/our-services">Our services</Link></Menu.Item>
          <Menu.Item key="/our-people"><Link to="/our-people">Our people</Link></Menu.Item>
          <Menu.Item key="/our-clients"><Link to="/our-clients">Our clients</Link></Menu.Item>
        </Menu>

        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>
          <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item>
        </Menu>
      </nav>
    );
  }
}

export default Navbar;
