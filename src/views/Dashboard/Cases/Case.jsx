import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Steps, Modal, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { DashboardLayout } from '../../../layouts'

import {
  CaseHeader,
  // InviteForm,
  HearingForm,
  VerdictForm,
} from '../../../components'
import HearingsTable from '../../../components/Hearing/HearingTable'
import CasePartiesTable from '../../../components/Case/CasePartiesTable'

import { fetchCase, inviteParty } from '../../../store/actions/case'
import { fetchUser } from '../../../store/actions/user'
import { fetchOrganizations } from '../../../store/actions/organizations'
import UploadForm from '../../../components/Document/UploadForm'
import $http from '../../../utils/api'
import Back from '../../../assets/images/back.png'
import PLUS from '../../../assets/images/plus.png'
import InviteForm from './InviteForm'
import ShimmerEffect from '../../../components/shimmer'

const { Step } = Steps

const Case = ({ dispatch, caseData, user, organizations, casesData }) => {
  const [hearingModal, setHearingModal] = useState(false)
  const [inviteModal, setInviteModal] = useState(false)
  const [documentModal, setDocumentModal] = useState(false)
  const [verdictModal, setVerdictModal] = useState(false)
  const [addCaseModal, setAddCaseModall] = useState(false)
  //store details about how the case is being accessed by the user
  const [access, updateAccess] = useState(null)
  const { caseId } = useParams()
  const history = useHistory()
  //initial data fetch
  useEffect(() => {
    dispatch(fetchCase(caseId))
    dispatch(fetchUser())
    dispatch(fetchOrganizations())
  }, [dispatch, caseId])
  //find out how the case is being accessed by user
  // This will work if the user is connected to case directly or through a organization
  // but not both
  useEffect(() => {
    if (user && caseData) {
      let type = 'Organization'
      let id
      let access = false
      for (let i = 0; i < caseData.members.length; i++) {
        if (user._id === caseData.members[i]._id) {
          type = 'User'
          break
        }
      }

      if (type === 'User') {
        id = user._id
        access = true
      } else
        for (let i = 0; i < caseData.organizations.length; i++) {
          for (let j = 0; j < caseData.organizations[i].members.length; j++) {
            if (caseData.organizations[i].members[j] === user._id) {
              id = caseData.organizations[i]._id
              if (user._id === caseData.organizations[i].owner) {
                access = true
              }
              break
            }
          }
        }
      updateAccess({ type, id, access })
    }
  }, [user, caseData])

  const showInviteModal = () => setInviteModal(true)

  const showVerdictModal = () => setVerdictModal(true)

  const handleOk = (e) =>
    setHearingModal(false) && setInviteModal(false) && setDocumentModal(false)

  const handleCancel = (e) =>
    setHearingModal(false) && setInviteModal(false) && setDocumentModal(false)

  const onDocumentUploadClick = (fd) => {
    fd.append('creater', user._id)
    fd.append('createrType', 'User')
    $http()({
      url: 'documents/upload',
      method: 'post',
      processData: false,
      data: fd,
    })
      .then((res) => {
        //message.success("upload successfully.");
        return true
      })
      .catch(() => {
        message.error('upload failed.')
        return false
      })
  }

  const Conditionally = () => (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card
          bordered={false}
          title='Case Parties'
          actions={[
            access && access.access && (
              <Button
                icon={<EditOutlined />}
                block
                type='primary'
                onClick={showInviteModal}
                style={{ maxWidth: '95%', marginBottom: 10 }}
              >
                Send Invite
              </Button>
            ),
          ]}
        >
          <CasePartiesTable
            members={caseData.members}
            organizations={caseData.organizations}
          />
        </Card>
      </Col>
    </>
  )

  const onInvitationFormSubmit = async (values) => {
    const res = await dispatch(
      inviteParty({
        senderType: access.type,
        sender: access.id,
        invitationType: 'Case',
        case: caseId,
        ...values,
      })
    )
    if (res) {
      setInviteModal(false)
    }
    return res
  }

  const checkCurrent = () => {
    if (caseData.status === 'creation') return 1
    else if (caseData.status === 'invitations') return 2
    else if (caseData.status === 'assignment') return 3
    else if (caseData.status === 'hearings') return 4
    else return 5
  }

  console.log(caseData, 'case in case')
  return (
    <DashboardLayout>
      {caseData ? (
        <>
          <Modal
            title='Invite Party'
            visible={addCaseModal}
            onCancel={() => setAddCaseModall(false)}
            destroyOnClose={true}
            footer={null}
          >
            <InviteForm onFinish={onInvitationFormSubmit} />
          </Modal>
          <div className='case-section'>
            <div className='address'>
              <div className='name'>
                <p>
                  <img src={Back} onClick={history.goBack} />
                  {caseData?.members.length > 0
                    ? caseData?.members.map((item, index) => (
                        <span>
                          {index ? ' Vs ' : ''} {item.firstName} {item.lastName}
                        </span>
                      ))
                    : ''}
                </p>
                <span className=''>
                  <a href=''>Hearing link</a>
                </span>
              </div>
              <div className=''>
                <label>Start Date:</label>
                <span className=''>{caseData.createdAt}</span>
                <br></br>
                <label>Estimated End Date:</label>
                <span className=''>22 December 2020</span>
              </div>
            </div>
            <Row gutter={[48, 16]} className='case-timeline'>
              <Col span={8}>
                <Card bordered={false} title=''>
                  <Steps
                    size='small'
                    current={checkCurrent()}
                    status='error'
                    direction='vertical'
                  >
                    <Step title='Creation' />
                    <Step title='Invitations' />
                    <Step title='Assignment' />
                    <Step title='Hearings' />
                    <Step title='Completion' />
                  </Steps>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className='document-container border'>
                  <div className='party'>
                    <h5>
                      Parties{' '}
                      <img src={PLUS} onClick={() => setAddCaseModall(true)} />
                    </h5>
                    <Row gutter={[55, 10]}>
                      {caseData &&
                        caseData.members &&
                        caseData.members.map((item, index) => (
                          <Col span={24}>
                            <div className='name'>
                              {`${item.firstName} ${item.lastName}`}
                            </div>
                          </Col>
                        ))}

                      {/* <Col span={12}>
                        <div className="parties">Accused</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">Arohan Infra Priv...</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">Reference Party</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">HDFC Bank</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">Member</div>
                      </Col>
                      <Col span={12}>
                        <div className="name">Prashant Anvi</div>
                      </Col>
                      <Col span={12}>
                        <div className="parties">Witness</div>
                      </Col> */}
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className='document-container border'>
                  <div className='party'>
                    <h5>Case Details</h5>
                    <Row gutter={[55, 10]}>
                      <Col span={12}>
                        <div className='name'>Type:</div>
                      </Col>
                      <Col span={12}>
                        <div className='parties'>{caseData.caseType.name}</div>
                      </Col>
                      <Col span={12}>
                        <div className='name'>Description:</div>
                      </Col>
                      <Col span={12}>
                        <div className='parties'>{caseData.description}</div>
                      </Col>
                      <Col span={12}>
                        <div className='name'>Status:</div>
                      </Col>
                      <Col span={12}>
                        <div className='parties'>{caseData.status}</div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className='update-section'>
              <Card bordered={false} className='document-container border'>
                <div className='update-card'>
                  <h4>Updates</h4>
                  <Row className='pb-2'>
                    <Col span={8}>Dec 21, 2020, 21:27</Col>
                    <Col span={8}>Mediator Sunanda Rao assigned</Col>
                    <Col span={8}>
                      <div className='text-end'>
                        <a href=''>View</a>
                        <a href='' className='b-left'></a>
                        <a href=''>Request</a>
                      </div>
                    </Col>
                  </Row>
                  <Row className='pb-2'>
                    <Col span={8}>Dec 21, 2020, 21:27</Col>
                    <Col span={8}>Mediator Sunanda Rao assigned</Col>
                    <Col span={8}>
                      <div className='text-end'>
                        <a href=''>View</a>
                        <a href='' className='b-left'></a>
                        <a href=''>Request</a>
                      </div>
                    </Col>
                  </Row>
                  <Row className='pb-2'>
                    <Col span={8}>Dec 21, 2020, 21:27</Col>
                    <Col span={8}>Mediator Sunanda Rao assigned</Col>
                    <Col span={8}>
                      <div className='text-end'>
                        <a href=''>View</a>
                        <a href='' className='b-left'></a>
                        <a href=''>Request</a>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>Dec 21, 2020, 21:27</Col>
                    <Col span={8}>Mediator Sunanda Rao assigned</Col>
                    <Col span={8}>
                      <div className='text-end'>
                        <a href=''>View</a>
                        <a href='' className='b-left'></a>
                        <a href=''>Request</a>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <ShimmerEffect />
      )}
    </DashboardLayout>
  )
}

const mapStateToProps = (state) => ({
  caseData: state.case,
  casesData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
})

export default connect(mapStateToProps)(Case)
