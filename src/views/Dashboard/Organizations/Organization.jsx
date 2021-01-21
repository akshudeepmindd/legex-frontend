import React, { useState } from 'react'
import Union from '../../../assets/images/Union.png'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  PageHeader,
  Descriptions,
  Button,
  Menu,
  Dropdown,
  Space,
  Badge,
  Modal,
  Popconfirm,
  Card,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { DashboardLayout } from '../../../layouts'
import {
  deleteOrganization,
  updateOrganization,
  inviteMember,
  leaveOrganization,
  fetchOrganization,
  createCase,
} from '../../../store/actions/organization'
import MembersTable from '../../../components/Organization/MembersTable'
import {
  OrganizationForm,
  AddMemForm,
  CasesTable,
  CaseForm,
} from '../../../components'
import { useEffect } from 'react'
import { respondInvite } from '../../../store/actions/invites'
//CSS
import 'antd/dist/antd.css'
import './Organization.css'
import DocumentsTable from '../../../components/Document/DocumentsTable'
import UploadForm from '../../../components/Document/UploadForm'
import { uploadDocument } from '../../../store/actions/documents'
import PLUS from '../../../assets/images/plus.png'
import Delete from '../../../assets/images/delete.png'

import { hearings, documents, updates } from '../../../utils/constants'
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
const Organization = ({
  dispatch,
  organization,
  organizationId,
  user,
  history,
  caseTypes,
}) => {
  useEffect(() => {
    dispatch(fetchOrganization(organizationId))
  }, [organizationId, dispatch])

  // const [invites, setInvites] = useState([])

  // useEffect(() => {
  // 	organization && setInvites(organization.invites.filter((i) => i.status === "waiting"))
  // }, [organization])

  const handleDelete = async () => {
    if (await dispatch(deleteOrganization(organizationId)))
      history.push('/dashboard/organizations')
  }
  const renderMembers = () => (
    <MembersTable
      members={organization.members}
      owner={organization.owner}
      user={user._id}
      organizationId={organizationId}
    />
  )
  const handleLeave = async () => {
    if (
      await dispatch(
        leaveOrganization({ organizationId, data: { uid: user._id } })
      )
    );
    history.push('/dashboard/organizations')
  }

  const renderCases = () => <CasesTable cases={organization.cases} />

  const [updateOrganizationModal, setUpdateOrganizationModal] = useState(false)
  const [inviteMemberModalVisibility, setInviteMemberModalVisibilty] = useState(
    false
  )
  const [createCaseModalVisibility, setCreateCaseModalVisibilty] = useState(
    false
  )

  const onUpdateFinish = async (values) =>
    (await dispatch(
      updateOrganization({
        organizationId,
        data: values,
      })
    )) && setUpdateOrganizationModal(false)

  const onInviteMemberFinish = async (values) =>
    (await dispatch(
      inviteMember({
        senderType: 'Organization',
        sender: organizationId,
        receiverType: 'User',
        invitationType: 'Organization',
        ...values,
      })
    )) && setInviteMemberModalVisibilty(false)

  const onCreateCaseFinish = async (values) =>
    (await dispatch(
      createCase({
        createrType: 'Organization',
        creater: organization._id,
        ...values,
      })
    )) && setCreateCaseModalVisibilty(false)

  const acceptConfirmation = ({ invite, message }) =>
    Modal.confirm({
      async onOk() {
        await dispatch(
          respondInvite({
            inviteId: invite._id,
            data: {
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
              response: 'Declined',
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
                    }`,
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

  //   const renderContentHeader = (column = 2) => (
  //     <Descriptions size="large" column={column}>
  //       <Descriptions.Item label="Domain">
  //         <a href={organization.domain}>{organization.domain}</a>
  //       </Descriptions.Item>
  //       <Descriptions.Item label="Creation Time">
  //         {new Date(organization.createdAt).toLocaleDateString()}
  //       </Descriptions.Item>
  //       <Descriptions.Item label="Owner">
  //         {`${organization.owner.firstName} ${organization.owner.lastName}(${organization.owner.email})`}
  //       </Descriptions.Item>
  //     </Descriptions>
  //   );
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false)
  const onDocumentUploadClick = async (formData) => {
    formData.append('creater', organization._id)
    formData.append('createrType', 'Organization')
    ;(await dispatch(uploadDocument(formData))) &&
      setUploadFormVisibility(false)
  }
  const textPopConfirm = 'Are you sure to delete this organization?'
  function Conditionally() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Popconfirm
            placement='bottomLeft'
            title={textPopConfirm}
            onConfirm={handleDelete}
            okText='Yes'
            cancelText='No'
          >
            <Button key='2' type='danger'>
              Delete
            </Button>
          </Popconfirm>
          <Button
            key='1'
            type='primary'
            onClick={() => setUpdateOrganizationModal(true)}
          >
            Update
          </Button>
        </>
      )
    }
    return (
      <>
        <Button onClick={handleLeave} type='danger'>
          Leave
        </Button>
      </>
    )
  }

  function MemberTableButtons() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Button
            key='2'
            onClick={() => setInviteMemberModalVisibilty(true)}
            type='primary'
          >
            Invite Member
          </Button>
        </>
      )
    }
    return <></>
  }

  function CasesTableButtons() {
    if (organization.owner._id === user._id) {
      return (
        <>
          <Dropdown
            key='3'
            overlay={pendingInvitationsMenu({
              invites: organization.invites,
            })}
            trigger={['click']}
          >
            <Button>
              <Space direction='horizontal'>
                <Badge
                  count={organization.invites.length}
                  overflowCount={9}
                  showZero={false}
                />
                Pending Invitations
                {organization.invites.length > 0 && <DownOutlined />}
              </Space>
            </Button>
          </Dropdown>
          <Button
            key='2'
            type='primary'
            onClick={() => setCreateCaseModalVisibilty(true)}
          >
            New Case
          </Button>
        </>
      )
    }
    return <></>
  }

  return (
    <>
      {organization && user ? (
        <DashboardLayout>
          {/* <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row
                gutter={[
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                ]}
              >
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={organization.name}
                    extra={[<Conditionally />]}
                  >
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Domain">
                        <a href={organization.domain}>{organization.domain}</a>
                      </Descriptions.Item>
                      <Descriptions.Item label="Creation Time">
                        {new Date(organization.createdAt).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Owner">
                        {`${organization.owner.firstName} ${organization.owner.lastName}(${organization.owner.email})`}
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <PageHeader
                    ghost={false}
                    //   onBack={() => window.history.back()}
                    title="Members"
                    subTitle="All Members"
                    extra={[<MemberTableButtons />]}
                  >
                    {renderMembers()}
                  </PageHeader>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <PageHeader
                    ghost={false}
                    //   onBack={() => window.history.back()}
                    title="Cases"
                    subTitle="All Cases"
                    extra={[<CasesTableButtons />]}
                  >
                    {renderCases()}
                  </PageHeader>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <PageHeader
                    ghost={false}
                    //   onBack={() => window.history.back()}
                    title="Documents"
                    subTitle="All Documents"
                    extra={[
                      organization.owner._id === user._id && (
                        <Row>
                          <Col>
                            <Button
                              onClick={() => setUploadFormVisibility(true)}
                            >
                              Upload
                            </Button>
                          </Col>
                        </Row>
                      ),
                    ]}
                  >
                    <DocumentsTable documents={organization.documents} />
                  </PageHeader>
                </Col>
              </Row>
            </Col>
          </Row>

          <Modal
            title="Organization Form"
            visible={updateOrganizationModal}
            onCancel={() => setUpdateOrganizationModal(false)}
            destroyOnClose={true}
            footer={null}
          >
            <OrganizationForm
              onFinish={onUpdateFinish}
              name={organization.name}
              domain={organization.domain}
            />
          </Modal>

          <Modal
            title="Add Member"
            visible={inviteMemberModalVisibility}
            onCancel={() => setInviteMemberModalVisibilty(false)}
            footer={null}
            destroyOnClose={true}
          >
            <AddMemForm onFinish={onInviteMemberFinish} />
          </Modal>

          <Modal
            title="Case Form"
            visible={createCaseModalVisibility}
            onFinish={onCreateCaseFinish}
            onCancel={() => setCreateCaseModalVisibilty(false)}
            destroyOnClose={true}
            footer={null}
          >
            <CaseForm onFinish={onCreateCaseFinish} caseTypes={caseTypes} />
          </Modal>
          <Modal
            title="Upload Document"
            visible={uploadFormVisbility}
            onCancel={() => setUploadFormVisibility(false)}
            footer={null}
            destroyOnClose={true}
          >
            <UploadForm onUpload={onDocumentUploadClick} />
          </Modal>*/}
          <Row>
            <Col flex='1 1 400px'>
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

              <img className='imgplus' src={PLUS} />
              <div className='address'>
                <div>
                  <label>Industry:</label>
                  <span className=''> Real Estate and Construction</span>
                </div>
                <div>
                  <label>Owner: </label>
                  <span className=''> Arohan Gupta</span>
                </div>
                <div>
                  <label>CIN: </label>
                  <span className=''> U7012PTC2022IN123456</span>
                </div>
              </div>
            </Col>
            <Col flex='1 1 600px'>
              {' '}
              <Row className='case-number-row case-row'>
                <Col span={8} className='dispute'>
                  <p>NO. OF DISPUTES</p>
                  <p>30</p>
                </Col>
                <Col span={8} className='resolve'>
                  <p>RESOLVED CASES</p>
                  <p>21</p>
                </Col>
                <Col span={8} className='pending'>
                  <p>PENDING CASES</p>
                  <p>09</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className='listingcontainer'>
            <Row gutter={[48, 16]}>
              <Col flex='1 1 400px'>
                <Card bordered={false} className='document-container'>
                  <Row className='upcoming'>
                    <h4>Documents</h4>
                    <img src={PLUS} alt='plus' />
                    <Link to='#'>view all</Link>
                  </Row>
                  {documents.map((docs) => (
                    <Row>
                      <Col span={12} className='documentText'>
                        {docs.name}
                      </Col>
                      <Col span={12} className='download'>
                        Image <img src={Union} alt='download' />
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
              <Col flex='1 1 600px'>
                <Card bordered={true} className='upcoming-container'>
                  <Row className='upcoming'>
                    <h4>Members</h4>
                  </Row>

                  {hearings.map((hear) => (
                    <>
                      <Row>
                        <Col span={5} className='documentText'>
                          {hear.time}
                        </Col>
                        <Col span={8} className='council'>
                          {hear.name}
                        </Col>
                        <Col span={8} className='download mailadd'>
                          <Link to='#'>{hear.join}</Link>
                        </Col>
                        <Col span={3} className='delete'>
                          <img src={Delete} alt='delete' />
                        </Col>
                      </Row>
                    </>
                  ))}
                  <a href='' className='view'>
                    View All
                  </a>
                </Card>
              </Col>
            </Row>
          </div>
          <div className='listingcontainer'>
            <div className='add-case'>
              <h3>Cases</h3>
              <Dropdown
                overlay={menu}
                trigger={['click']}
                className='dropdown-organize'
              >
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => e.preventDefault()}
                >
                  All Cases<DownOutlined />
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
                  Next Hearing <DownOutlined />
                </a>
              </Dropdown>
            </div>
            <Row gutter={[48, 16]}>
              <Col span={8}>
                <Card bordered={false} className='document-container'>
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
                <Card bordered={false} className='document-container'>
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
                <Card bordered={false} className='document-container'>
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
                <Card bordered={false} className='document-container'>
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
                <Card bordered={false} className='document-container'>
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
                <Card bordered={false} className='document-container'>
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
            </Row>
          </div>
          <div className=''></div>
        </DashboardLayout>
      ) : (
        'loading...'
      )}
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  organization: state.organization,
  user: state.user,
  organizationId: ownProps.match.params.organizationId,
  history: ownProps.history,
  caseTypes: state.caseTypes.caseTypes,
})

export default connect(mapStateToProps)(Organization)
