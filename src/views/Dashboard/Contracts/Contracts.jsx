import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Dropdown, Menu, Button } from 'antd'
import { DashboardLayout } from '../../../layouts'
import { DownOutlined } from '@ant-design/icons'
import PLUS from '../../../assets/images/plus.png'
import Union from '../../../assets/images/Union.png'

import { unsecured } from '../../../utils/constants'
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

export default () => {
  return (
    <>
      <DashboardLayout>
        <div className='contracts'>
          {' '}
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
          <span className="image-plus"><img src={PLUS} /></span>
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
              <Col span={8}>
                <Card bordered={false} className='document-container'>
                  <div className='review'>
                    <div className='d-flex'>
                      Franchise Agreement
                      <Button type='primary' className='sent-btn' block>
                        Secured
                      </Button>
                    </div>

                    <p>Kolkata, Victoria’s Museum</p>
                    <p>INR 4,02,03,000</p>
                    <p>Dec 20, 2019, 04:42</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className='document-container'>
                  <div className='review'>
                    <div className='d-flex'>
                      Promissory Note
                      <Button type='primary' className='review-btn' block>
                        Under Dispute
                      </Button>
                    </div>

                    <p>Parayatan Seva Kendra, Jhurun</p>
                    <p>INR 8,24,000</p>
                    <p>Dec 20, 2019, 04:42</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className='document-container'>
                  <div className='review'>
                    <div className='d-flex'>
                      Revenue Share Agreement
                      <Button type='primary' className='complete-btn' block>
                        Resolved
                      </Button>
                    </div>

                    <p>Brenton India Limited</p>
                    <p>INR 14,83,20,000</p>
                    <p>Dec 20, 2019, 04:42</p>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={[48, 16]} className='secure-contract'>
              <Col span={8}>
                <Card bordered={false} className='document-container'>
                  <div className='review'>
                    <div className='d-flex'>
                      Franchise Agreement
                      <Button type='primary' className='sent-btn' block>
                        Secured
                      </Button>
                    </div>

                    <p>Kolkata, Victoria’s Museum</p>
                    <p>INR 4,02,03,000</p>
                    <p>Dec 20, 2019, 04:42</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className='document-container'>
                  <div className='review'>
                    <div className='d-flex'>
                      Promissory Note
                      <Button type='primary' className='review-btn' block>
                        Under Dispute
                      </Button>
                    </div>

                    <p>Parayatan Seva Kendra, Jhurun</p>
                    <p>INR 8,24,000</p>
                    <p>Dec 20, 2019, 04:42</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} className='document-container'>
                  <div className='review'>
                    <div className='d-flex'>
                      Revenue Share Agreement
                      <Button type='primary' className='complete-btn' block>
                        Resolved
                      </Button>
                    </div>

                    <p>Brenton India Limited</p>
                    <p>INR 14,83,20,000</p>
                    <p>Dec 20, 2019, 04:42</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
