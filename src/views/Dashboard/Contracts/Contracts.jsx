import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Card, Dropdown, Menu, Button, Select } from 'antd'
import { connect } from 'react-redux'
import { DashboardLayout } from '../../../layouts'
import { DownOutlined } from '@ant-design/icons'
import PLUS from '../../../assets/images/plus.png'
import Union from '../../../assets/images/Union.png'
import { fetchContractCases } from '../../../store/actions/contract'
import { unsecured } from '../../../utils/constants'
import moment from 'moment'
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

const Contracts = ({
  dispatch,
  organization,
  organizationId,
  user,
  history,
  caseTypes,
  organizations,
  cases,
  hearings,
  contract,
}) => {
  const [selectedOrg, setSelectedOrg] = useState('')
  const onChangeOrg = (value) => {
    setSelectedOrg(value)
  }
  useEffect(() => {
    async function fetchContracts() {
      dispatch(fetchContractCases())
    }
    fetchContracts()
  }, [])

  return (
    <>
      <DashboardLayout>
        <div className='contracts'>
          <Select placeholder='Select a Organization' onChange={onChangeOrg}>
            {organizations?.length > 0
              ? organizations?.map((item, index) => (
                  <Select.Option value={item._id} key={index}>
                    {item.name}
                  </Select.Option>
                ))
              : 'null'}
          </Select>
          <span className='image-plus'>
            <img
              src={PLUS}
              onClick={() => history.push('/dashboard/securecontracts')}
            />
          </span>
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
          <Row>
            <Col span={24}>
              <Card bordered={false} className='document-container card-border'>
                <Row className='upcoming'>
                  <h3>Unsecured contracts</h3>
                </Row>
                {unsecured.map((docs) => (
                  <Row>
                    <Col span={5} className='documentText'>
                      {docs.date}
                    </Col>
                    <Col span={5}>{docs.name}</Col>
                    <Col span={3}>{docs.party}</Col>
                    <Col span={4} className='download2'>
                      {docs.case}
                    </Col>
                    <Col span={4} className='download2'>
                      {docs.secure}
                    </Col>
                    <Col span={3} className='download2'>
                      <img src={Union} />
                    </Col>
                  </Row>
                ))}
              </Card>
            </Col>
          </Row>
          <div className='mt-4'>
            <h3>Secured Contracts</h3>

            <Row gutter={[48, 16]} className='secure-contract'>
              {contract?.map((cont) => (
                <Col span={8}>
                  <Card bordered={false} className='document-container'>
                    <div className='review'>
                      <div className='d-flex'>
                        {cont.contractdetails.type}
                        <Button type='primary' className='sent-btn' block>
                          Secured
                        </Button>
                      </div>

                      <p>Kolkata, Victoria’s Museum</p>
                      <p>INR {cont.InsuredValue}</p>
                      <p>{moment(cont.createdAt).format('DD MM YYYY HH:SS')}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  organization: state.organization,
  user: state.user,
  organizationId: ownProps.match.params.organizationId,
  history: ownProps.history,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  cases: state.cases,
  hearings: state.hearings,
  contract: state.contractCase,
})

export default connect(mapStateToProps)(Contracts)
