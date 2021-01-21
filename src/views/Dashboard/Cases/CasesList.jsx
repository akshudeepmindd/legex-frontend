import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

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
} from 'antd'
import {
  AppstoreOutlined,
  DownOutlined,
  TableOutlined,
} from '@ant-design/icons'
import plus from '../../../assets/images/plus.png'

// components
import { DashboardLayout } from '../../../layouts'
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

const CasesList = ({
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

  useEffect(() => {
    user &&
      setInvites(
        user.invites.filter(
          (i) => i.invitationType === 'Case' && i.status === 'Waiting'
        )
      )
  }, [user])
  const showModal = () => {
    setModal(true)
  }

  const toggleView = () => {
    setView(!view)
  }

  const onFinish = async (values) => {
    const response = await dispatch(
      createCase({ createrType: 'User', creater: user._id, ...values })
    )
    setModal(!response)
    return response
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

  return (
    <DashboardLayout>
      {cases && caseTypes && organizations ? (
        <>
          <div className='all-case'>
            <div className='case-sec'>
              <Row gutter={[48, 16]}>
                <Col flex={2}>
                  <div className='flex'>
                    <h4>All Cases</h4>
                    <h5><img src={plus}/>Add a case</h5>
                  </div>
                </Col>
                <Col flex={3} className='flex-end'>
                  <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    className='dropdown-organize'
                  >
                    <a
                      className='ant-dropdown-link'
                      onClick={(e) => e.preventDefault()}
                    >
                      Arohan Infra Private Limited <DownOutlined />
                    </a>
                  </Dropdown>
                  <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    className='dropdown-organize'
                  >
                    <a
                      className='ant-dropdown-link'
                      onClick={(e) => e.preventDefault()}
                    >
                      Arohan Infra Private Limited <DownOutlined />
                    </a>
                  </Dropdown>
                  <Input type='text' placeholder='Search' value='' />
                </Col>
              </Row>
            </div>
            <Row gutter={[48, 16]}>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Rohit Sharma
                      <Button type='primary' className='review-btn' block>
                        Under Review
                      </Button>
                    </div>

                    <p>Loan Dispute</p>
                    <p>Expected Date of Resolve : 8 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mohit Shegal
                      <Button type='primary' className='sent-btn' block>
                        Notice Sent
                      </Button>
                    </div>

                    <p>Recovery</p>
                    <p>Expected Date of Resolve : 19 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mukesh Thapar
                      <Button type='primary' className='complete-btn' block>
                        Complete
                      </Button>
                    </div>

                    <p>Real estate</p>
                    <p>Expected Date of Resolve : 12 Jan 2021</p>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={[48, 16]}>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Rohit Sharma
                      <Button type='primary' className='review-btn' block>
                        Under Review
                      </Button>
                    </div>

                    <p>Loan Dispute</p>
                    <p>Expected Date of Resolve : 8 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mohit Shegal
                      <Button type='primary' className='sent-btn' block>
                        Notice Sent
                      </Button>
                    </div>

                    <p>Recovery</p>
                    <p>Expected Date of Resolve : 19 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mukesh Thapar
                      <Button type='primary' className='complete-btn' block>
                        Complete
                      </Button>
                    </div>

                    <p>Real estate</p>
                    <p>Expected Date of Resolve : 12 Jan 2021</p>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[48, 16]}>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Rohit Sharma
                      <Button type='primary' className='review-btn' block>
                        Under Review
                      </Button>
                    </div>

                    <p>Loan Dispute</p>
                    <p>Expected Date of Resolve : 8 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mohit Shegal
                      <Button type='primary' className='sent-btn' block>
                        Notice Sent
                      </Button>
                    </div>

                    <p>Recovery</p>
                    <p>Expected Date of Resolve : 19 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mukesh Thapar
                      <Button type='primary' className='complete-btn' block>
                        Complete
                      </Button>
                    </div>

                    <p>Real estate</p>
                    <p>Expected Date of Resolve : 12 Jan 2021</p>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[48, 16]}>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Rohit Sharma
                      <Button type='primary' className='review-btn' block>
                        Under Review
                      </Button>
                    </div>

                    <p>Loan Dispute</p>
                    <p>Expected Date of Resolve : 8 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mohit Shegal
                      <Button type='primary' className='sent-btn' block>
                        Notice Sent
                      </Button>
                    </div>

                    <p>Recovery</p>
                    <p>Expected Date of Resolve : 19 Jan 2021</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className='document-container border-crd'
                >
                  <div className='review'>
                    <div className='d-flex'>
                      vs. Mukesh Thapar
                      <Button type='primary' className='complete-btn' block>
                        Complete
                      </Button>
                    </div>

                    <p>Real estate</p>
                    <p>Expected Date of Resolve : 12 Jan 2021</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      ) : null}
    </DashboardLayout>
  )
}

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
})

export default connect(mapStateToProps)(CasesList)
