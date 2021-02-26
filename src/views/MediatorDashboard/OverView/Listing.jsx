import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import Plus from '../../../assets/images/plus.png'
import Union from '../../../assets/images/Union.png'
import { fetchCases } from '../../../store/actions/cases'
import { fetchHearings } from '../../../store/actions/hearings'

import { hearings2, documents, updates } from '../../../utils/constants'
const Listing = ({
  dispatch,
  caseData,
  organizations,
  organization,
  user,
  hearings,
}) => {
  // useEffect(() => {
  //   dispatch(fetchHearings());
  // }, [dispatch]);
  const [selectedOrg, setSelectedOrg] = useState('')
  const [selectedCase, setSelectedCase] = useState('')
  const [selectedHearing, setSelectedHearing] = useState('')
  const history = useHistory()
  const filterOrganization = organizations?.find(
    (item) => item._id === selectedOrg
  )
  let pendingCases = filterOrganization?.cases?.filter(
    (caseee) => caseee.status !== 'completion'
  )

  let pendingCasess = organization?.cases?.filter(
    (caseee) => caseee.status !== 'completion'
  )

  let resolvedCases = filterOrganization?.cases?.filter(
    (caseee) => caseee.status == 'completion'
  )

  let resolvedCasess = organization?.cases?.filter(
    (caseee) => caseee.status == 'completion'
  )
  const filterCases = filterOrganization?.cases.find(
    (item) => item._id === selectedCase
  )
  const onChangeOrg = (value) => {
    setSelectedOrg(value)
  }
  const onChangeCase = (value) => {
    setSelectedCase(value)
  }
  const onChangeHearing = (value) => {
    setSelectedHearing(value)
  }
  const userUpcomingHearing = () => {
    return user?.cases?.map((item) => {
      if (item?.hearings?.length > 0) {
        return item.hearings?.map((item) => {
          if (
            moment(item.startDateTime).format('MMMM Do YYYY, h:mm:ss a') >=
            moment().format('MMMM Do YYYY, h:mm:ss a')
          ) {
            return (
              <Row key={item.id}>
                <Col span={12} className='documentText'>
                  {moment(item.startDateTime).format('MMMM Do YYYY, h:mm:ss a')}
                </Col>
                <Col span={8}>{item?.case?.title}</Col>
                {/* <Col span={8} className="download">
                  <Link to="#">{hear.join}</Link>
                </Col> */}
              </Row>
            )
          }
        })
      }
    })
  }

  return (
    <div className='listingcontainer'>
      <Row gutter={[48, 16]}>
        <Col span={12}>
          <Card bordered={true} className='upcoming-container'>
            <Row className='upcoming'>
              <h4>Upcoming hearings</h4>
              <Link to='#'>view all</Link>
            </Row>
            {userUpcomingHearing()}
            {/* {hearings2.map((hear) => (
              <>
                <p className="month">{hear.month}</p>
                <Row>
                  <Col span={8} className="documentText">
                    {hear.time}
                  </Col>
                  <Col span={8}>{hear.name}</Col>
                  <Col span={8} className="download">
                    <Link to="#">{hear.join}</Link>
                  </Col>
                </Row>
              </>
            ))} */}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row gutter={[48, 16]}>
            {user?.cases.length > 0 ? (
              user?.cases?.map((item, index) => (
                <Col span={8}>
                  <Card bordered={false} className='document-container'>
                    <div className='review'>
                      <div className='d-flex '>
                        {item?.title}
                        <Button
                          type={
                            item.status == 'invitations' ? 'default' : 'primary'
                          }
                          className={
                            item.status === 'invitations'
                              ? 'invitation-btn'
                              : item.status === 'creation'
                              ? 'creation-btn'
                              : 'review-btn'
                          }
                          block
                          onClick={() =>
                            history.push(`/mediator/cases/${item._id}`)
                          }
                        >
                          {item.status}
                        </Button>
                      </div>

                      <p>{item?.caseType?.name}</p>
                      <p>Expected Date of Resolve : 8 Jan 2021</p>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={12}>
                <Card bordered={true} className='upcoming-container'>
                  <Row className='upcoming'>
                    <h4>No Cases Available</h4>
                    {/* <Link to='#'>view all</Link> */}
                  </Row>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  caseData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
  hearings: state.hearings,
})

export default connect(mapStateToProps)(Listing)
