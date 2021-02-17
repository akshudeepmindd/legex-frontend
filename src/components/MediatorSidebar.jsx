import React from 'react'
import { Menu } from 'antd'
import {
  HomeOutlined,
  ApartmentOutlined,
  FolderOutlined,
  WalletOutlined,
  //SettingOutlined,
  //InfoCircleOutlined,
  //CalendarOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

import { logout } from '../store/actions/auth'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MediatorMenu } from '../utils/constants'

function Sidebar(props) {
  const dispatch = useDispatch()

  const Logout = async () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('user-id')
    dispatch(logout())
  }
  const collapseSide = {
    marginRight: 20,
    padding: 10,
    height: 60,
  }
  return (
    <div className='sidebar'>
      <Menu className='menu-ul' theme='dark' mode='inline'>
        {MediatorMenu.map((item) => (
          <Menu.Item
            key={item.menuKey}
            className='menuItems'
            icon={
              <img
                src={item.menuIconClass}
                className={item.iconclass}
                alt={item.alt}
              />
            }
            style={collapseSide}
          >
            <Link to={item.menuLink}>{item.menuName}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default Sidebar
