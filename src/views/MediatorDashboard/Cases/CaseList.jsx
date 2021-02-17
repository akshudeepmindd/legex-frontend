import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

// ant design components
import {
  Row,
  Col,
  PageHeader,
  Modal,
  Button,
  Card,
  Empty,
  Typography,
  Menu,
  Badge,
  Dropdown,
  Space,
  Input,
  Select,
} from 'antd'
import {
  AppstoreOutlined,
  DownOutlined,
  TableOutlined,
} from '@ant-design/icons'
import plus from '../../../assets/images/plus.png'

// components
import { MediatorDashboardLayout } from '../../../layouts'
import { CaseCard, CasesTable, CaseForm } from '../../../components'

// redux actions
import { createCase } from '../../../store/actions/cases'
import { respondInvite } from '../../../store/actions/invites'
const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='http://www.alipay.com/'>1st menu item</a>
    </Menu.Item>
    <Menu.Item key='1'>
      <a href='http://www.taobao.com/'>2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='3'>3rd menu item</Menu.Item>
  </Menu>
)
const { Text } = Typography

const MediatorCasesList = ({
  dispatch,
  loading,
  cases,
  caseTypes,
  organizations,
  user,
}) => {
  const [view, setView] = useState(false)
  const [modal, setModal] = useState(false)
  const [invites, setInvites] = useState([])
  const [selectedOrg, setSelectedOrg] = useState('')
  const [addCaseModal, setAddCaseModall] = useState(false)
  useEffect(() => {
    user &&
      setInvites(
        user.invites.filter(
          (i) => i.invitationType === 'Case' && i.status === 'Waiting'
        )
      )
  }, [user])
  const onChangeOrg = (value) => {
    setSelectedOrg(value)
  }
  const history = useHistory()
  // useEffect(() => {
  //   const allCompletedCase = cases?.filter(
  //     (item) => item.status === "completion"
  //   );
  // }, [cases]);
  const showModal = () => {
    setModal(true)
  }

  const toggleView = () => {
    setView(!view)
  }

  const acceptConfirmation = ({ invite, message }) =>
    Modal.confirm({
      async onOk() {
        await dispatch(
          respondInvite({
            inviteId: invite._id,
            data: {
              invitationType: 'Case',
              response: 'Accepted',
              invite: invite._id,
            },
          })
        )
      },
      async onCancel() {
        await dispatch(
          respondInvite({
            inviteId: invite._id,
            data: {
              resp: 'Declined',
              invite: invite._id,
            },
          })
        )
      },
      content: message,
      cancelText: 'Decline',
      okText: 'Accept',
    })

  const pendingInvitationsMenu = ({ invites }) => {
    return (
      <Menu>
        {invites.length > 0 ? (
          invites.map((invite) => {
            return (
              <Menu.Item
                key={invite._id}
                onClick={async () => {
                  acceptConfirmation({
                    invite,
                    message: `Do you want to accept ${
                      invite.senderType === 'User'
                        ? `${invite.sender.firstName} ${invite.sender.lastName}`
                        : invite.sender.name
                    }'s invitation to case ${invite.case.title}?`,
                  })
                }}
              >
                {invite.sender.name || invite.sender.email}
              </Menu.Item>
            )
          })
        ) : (
          <Menu.Item>No Pending Invites</Menu.Item>
        )}
      </Menu>
    )
  }
  const renderCases = () => {
    if (cases.length > 0) {
      if (view) {
        return (
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {cases.map((data) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <CaseCard data={data} />
              </Col>
            ))}
          </Row>
        )
      }
      return <CasesTable cases={cases} loading={loading} />
    }
    return (
      <Card bordered={false}>
        <Empty description={<Text>No Cases Found</Text>} />
      </Card>
    )
  }

  const allCase = () => {
    if (cases?.length > 0) {
      return (
        <Row gutter={[48, 16]}>
          {cases?.map((item, index) => (
            <Col span={8} key={index}>
              <Card bordered={false} className='document-container border-crd'>
                <div className='review'>
                  <div className='d-flex'>
                    vs. Rohit Sharma
                    <Button type='primary' className='review-btn' block>
                      {item.status}
                    </Button>
                  </div>

                  <p>{item.caseType.name}</p>
                  <p>Expected Date of Resolve : 8 Jan 2021</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )
    }
  }

  const filterOrganization = organizations?.find(
    (item) => item._id === selectedOrg
  )

  const onFinish = async (values) => {
    const response = await dispatch(
      createCase({ createrType: 'User', creater: user._id, ...values })
    )
    setAddCaseModall(false)
    history.push('/dashboard/cases')
    return response
  }

  console.log(cases, 'cases in cases')
  return (
    <MediatorDashboardLayout>
      {cases && caseTypes && organizations ? (
        <>
          <Modal
            title='Organization Form'
            visible={addCaseModal}
            onCancel={() => setAddCaseModall(false)}
            destroyOnClose={true}
            footer={null}
          >
            <CaseForm onFinish={onFinish} caseTypes={caseTypes} />
          </Modal>
          <div className='all-case'>
            <div className='case-sec'>
              <Row gutter={[48, 16]}>
                <Col flex={2}>
                  <div className='flex'>
                    <h4>All Cases</h4>
                  </div>
                </Col>
                <Col flex={3} className='flex-end'>
                  <Select
                    placeholder='Select a Organization'
                    onChange={onChangeOrg}
                  >
                    {organizations?.length > 0
                      ? organizations?.map((item, index) => (
                          <Select.Option value={item._id} key={index}>
                            {item.name}
                          </Select.Option>
                        ))
                      : 'null'}
                  </Select>
                  <Input type='text' placeholder='Search' value='' />
                </Col>
              </Row>
            </div>
            {filterOrganization ? (
              filterOrganization.cases.length > 0 ? (
                <Row gutter={[48, 16]}>
                  {filterOrganization?.cases.map((item, index) => (
                    <Col span={8} key={index}>
                      <Card
                        bordered={false}
                        className='document-container border-crd'
                      >
                        <div className='review'>
                          <div className='d-flex'>
                            {item.members.map((item, index) => (
                              <span>
                                {index ? ' Vs ' : ''} {item.firstName}{' '}
                                {item.lastName}
                              </span>
                            ))}
                            <Button
                              type='primary'
                              className={
                                item.status === 'completion'
                                  ? 'complete-btn'
                                  : 'review-btn'
                              }
                              onClick={() =>
                                history.push(`/mediator/cases/${item._id}`)
                              }
                              block
                            >
                              {item.status}
                            </Button>
                          </div>

                          <p>{item.caseType.name}</p>
                          <p>Expected Date of Resolve : 8 Jan 2021</p>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                'no case avelable'
              )
            ) : user?.cases?.length > 0 ? (
              <Row gutter={[48, 16]}>
                {user?.cases?.map((item, index) => (
                  <Col span={8} key={index}>
                    <Card
                      bordered={false}
                      className='document-container border-crd'
                    >
                      <div className='review'>
                        <div className='d-flex'>
                          <div>
                            {item?.members?.map((item, index) => (
                              <span>
                                {index ? ' Vs ' : ''} {item.firstName}{' '}
                                {item.lastName}
                              </span>
                            ))}
                          </div>
                          <Button
                            type='primary'
                            className={
                              item?.status === 'completion'
                                ? 'complete-btn'
                                : 'review-btn'
                            }
                            onClick={() =>
                              history.push(`/mediator/cases/${item._id}`)
                            }
                            block
                          >
                            {item?.status}
                          </Button>
                        </div>

                        <p>{item?.caseType?.name}</p>
                        <p>Expected Date of Resolve : 8 Jan 2021</p>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Card bordered={true} className='upcoming-container'>
                <Row className='upcoming'>
                  <h4>No Cases Available</h4>
                </Row>
              </Card>
            )}
          </div>
        </>
      ) : null}
    </MediatorDashboardLayout>
  )
}

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
})

export default connect(mapStateToProps)(MediatorCasesList)
