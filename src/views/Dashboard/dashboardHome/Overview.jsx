import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// ant design components
import {
  Row,
  Col,
  Card,
  Avatar,
  //Form,
  //Select,
  //Comment,
  //List,
  Button,
  Typography,
  Modal,
  Empty,
  Descriptions,
} from 'antd'
import { UserOutlined, EditOutlined } from '@ant-design/icons'

// components
import { DashboardLayout } from '../../../layouts'
import { CasesTable, ProfileForm } from '../../../components'
import { editUser } from '../../../store/actions/user'
import UserProfile from './userProfile'
import Listing from './Listing'
import ShimmerEffect from '../../../components/shimmer'

const { Text } = Typography
const { Meta } = Card
//const { Option } = Select;

const Overview = ({
  user,
  cases,
  casesLoading,
  organizations,
  messages,
  dispatch,
}) => {
  //const [selectedOrganization, setSelectedOrganization ] = useState([]);
  const [profileModal, setProfileModal] = useState(false)

  return (
    <DashboardLayout>
      {organizations && user ? (
        <div className='overview-container'>
          <UserProfile />
          <Listing />
        </div>
      ) : (
        <ShimmerEffect />
      )}
    </DashboardLayout>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  cases: state.cases,
  organizations: state.organizations,
})

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object),
  cases: PropTypes.instanceOf(Array),
  organizations: PropTypes.instanceOf(Array),
  messages: PropTypes.instanceOf(Array),
}

export default connect(mapStateToProps)(Overview)
