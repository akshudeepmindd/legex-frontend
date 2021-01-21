import React, { useState } from 'react'
import { Layout, Row, Col } from 'antd'
import PropTypes from 'prop-types'
//import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useMediaQuery } from '@react-hook/media-query'
import Logo from '../assets/images/logo.png'
import iconbar from '../assets/images/iconbar.png'
import bell from '../assets/images/bell.png'
import avtar from '../assets/images/avtar.png'
import { Sidebar } from '../components'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const {
  //Header,
  Sider,
  Content,
  Footer,
  Header,
} = Layout

function DashboardLayout(props) {
  const { children } = props
  const [collapsed, setCollapsed] = useState(false)
  const [year] = useState(new Date().getFullYear())
  const phoneView = useMediaQuery('only screen and (max-width: 768px)')

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      {phoneView && (
        <Sider breakpoint='lg' collapsedWidth='0'>
          <img src={Logo} alt='Legex' className='logo' />
          <Sidebar collapsed={collapsed} />
        </Sider>
      )}
      {!phoneView && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <img src={Logo} alt='Legex' className='logo' />
          <Sidebar collapsed={collapsed} />
        </Sider>
      )}

      <Layout className='dashboard-layout'>
        {!phoneView && (
          <Header className='dashboard-layout-header'>
            {/* {React.createElement(
              collapsed ? <img src={iconbar} alt='bar' /> : MenuFoldOutlined,
              {
                onClick: toggle,
              }
            )} */}
            <Row>
              <Col span={8}>
                <img src={iconbar} alt='bar' onClick={toggle} />
              </Col>
              <Col span={8} offset={8} className='iconContainer'>
                <img src={bell} alt='bar' className='bel' onClick={toggle} />
                <img
                  src={avtar}
                  alt='bar'
                  className='avatar'
                  onClick={toggle}
                />
                <span>UserName</span>
              </Col>
            </Row>
          </Header>
        )}
        <Content className='dashboard-layout-content'>{children}</Content>
        <Footer className='dashboard-layout-footer'>
          <b>Legex ODR</b> &copy; {year} A &nbsp;
          <a href='https://www.legex.in/'>Legex</a> product.
        </Footer>
      </Layout>
    </Layout>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default DashboardLayout
