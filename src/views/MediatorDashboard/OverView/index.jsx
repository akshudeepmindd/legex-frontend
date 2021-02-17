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
import { MediatorDashboardLayout } from '../../../layouts'
import { CasesTable, ProfileForm } from '../../../components'
import { editUser } from '../../../store/actions/user'
import UserProfile from './userProfile'
import Listing from './Listing'

const { Text } = Typography
const { Meta } = Card
//const { Option } = Select;

const MediatorOverview = ({
  user,
  cases,
  casesLoading,
  organizations,
  messages,
  dispatch,
}) => {
  //const [selectedOrganization, setSelectedOrganization ] = useState([]);
  const [profileModal, setProfileModal] = useState(false)

  const toggleModal = () => {
    setProfileModal(true)
  }
  const handleOk = (e) => {
    setProfileModal(false)
  }

  const handleCancel = (e) => {
    setProfileModal(false)
  }

  const renderCasesTable = () => {
    console.log(cases, 'cases')
    return (
      <CasesTable
        cases={cases}
        loading={casesLoading}
        scroll={{
          y: 300,
          x: '100vw',
        }}
      />
    )
  }

  const onUpdateFinish = async (values) =>
    await dispatch(
      editUser({
        data: values,
      })
    )

  const renderUserProfile = () => {
    if (user.hasOwnProperty('firstName')) {
      return (
        <Card
          bordered={false}
          actions={[
            <Button
              type='primary'
              icon={<EditOutlined />}
              block
              onClick={toggleModal}
              style={{ maxWidth: '95%', marginBottom: 10 }}
            >
              Edit Profile
            </Button>,
          ]}
        >
          {/* <Meta
            avatar={
              <Avatar
                size='large'
                icon={<UserOutlined />}
                className='avatar-placeholder'
                shape='square'
              />
            }
            title={`${user.firstName} ${user.lastName}`}
            description={[
              <Descriptions size='small' column={1}>
                <Descriptions.Item label='User Email'>
                  {<Text>{user.email}</Text>}
                </Descriptions.Item>

                <Descriptions.Item label='Phone Number'>
                  <Text>{user.phone}</Text>
                </Descriptions.Item>
              </Descriptions>,
            ]}
          /> */}
        </Card>
      )
    }
    return (
      <Card title='User Profile'>
        <Empty />
      </Card>
    )
  }

  // const renderOrganizationMembers = () => {
  //   selectedOrganization.map((member) => (
  //     <Card bordered={false}>
  //       <Meta
  //         avatar={
  //           <Avatar
  //             size={64}
  //             icon={<UserOutlined />}
  //             className="avatar-placeholder"
  //             shape="square"
  //           />
  //         }
  //         title={member.firstName}
  //         description={[
  //           <Text>{member.email}</Text>,
  //           <Text>{member.phone}</Text>,
  //         ]}
  //       />
  //     </Card>
  //   ));
  // };

  // const organizationOptions = (organizations) =>
  //   organizations.map((organization) => (
  //     <Option key={organization._id}>{organization.name}</Option>
  //   ));

  // const selectOrganization = (value) => {
  //   const selected = organizations.filter(
  //     (organization) => organization._id === value
  //   );
  //   setSelectedOrganization(selected[0].members);
  // };

  return (
    <MediatorDashboardLayout>
      {organizations && user ? (
        <div className='overview-container'>
          <UserProfile />
          <Listing />
        </div>
      ) : (
        // <>
        //   <Row
        //     gutter={[
        //       { xs: 8, sm: 16, md: 24, lg: 32 },
        //       { xs: 8, sm: 16, md: 24, lg: 32 },
        //     ]}
        //     justify='center'
        //     align='top'
        //   >
        //     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        //       {renderUserProfile()}
        //     </Col>

        //     {/*
        //       <Col xs={24} sm={24} md={6} lg={6} xl={6} />
        //       <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        //       <Card bordered={false} title="My Organizations">
        //         <Form>
        //           <Form.Item>
        //             <Select onChange={selectOrganization}>
        //               {organizationOptions}
        //             </Select>
        //           </Form.Item>
        //           {renderOrganizationMembers()}
        //         </Form>
        //       </Card>
        //     </Col> */}
        //   </Row>

        //   <Row
        //     gutter={[
        //       { xs: 8, sm: 16, md: 24, lg: 32 },
        //       { xs: 8, sm: 16, md: 24, lg: 32 },
        //     ]}
        //   >
        //     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        //       <Card title='All Cases'>{renderCasesTable()}</Card>
        //     </Col>
        //   </Row>

        //   <Modal
        //     title='Edit Profile'
        //     visible={profileModal}
        //     onOk={handleOk}
        //     onCancel={handleCancel}
        //   >
        //     <ProfileForm
        //       onFinish={onUpdateFinish}
        //       firstName={user.firstName}
        //       lastName={user.lastName}
        //       phone={user.phone}
        //     />
        //   </Modal>
        // </>
        'loading...'
      )}
    </MediatorDashboardLayout>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  cases: state.cases,
  organizations: state.organizations,
})

MediatorOverview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object),
  cases: PropTypes.instanceOf(Array),
  organizations: PropTypes.instanceOf(Array),
  messages: PropTypes.instanceOf(Array),
}

export default connect(mapStateToProps)(MediatorOverview)
