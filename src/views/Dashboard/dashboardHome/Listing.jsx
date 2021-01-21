import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'antd'
import Plus from '../../../assets/images/plus.png'
import Union from '../../../assets/images/Union.png'
import { hearings, documents, updates } from '../../../utils/constants'
export default () => {
  return (
    <div className='listingcontainer'>
      <Row gutter={[48, 16]}>
        <Col span={12}>
          <Card bordered={true} className='upcoming-container'>
            <Row className='upcoming'>
              <h4>Upcoming hearings</h4>
              <Link to='#'>view all</Link>
            </Row>

            {hearings.map((hear) => (
              <>
                <p className='month'>{hear.month}</p>
                <Row>
                  <Col span={8} className='documentText'>
                    {hear.time}
                  </Col>
                  <Col span={8}>{hear.name}</Col>
                  <Col span={8} className='download'>
                    <Link to='#'>{hear.join}</Link>
                  </Col>
                </Row>
              </>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} className='document-container'>
            <Row className='upcoming'>
              <h4>Documents</h4>
              <img src={Plus} alt='plus' />
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
      </Row>
      <Row>
        <Col span={24}>
          <Card bordered={false} className='document-container'>
            <Row className='upcoming'>
              <h3>Updates</h3>
            </Row>
            {updates.map((docs) => (
              <Row>
                <Col span={6} className='documentText'>
                  {docs.date}
                </Col>
                <Col span={6}>{docs.name}</Col>
                <Col span={6}>{docs.party}</Col>
                <Col span={6} className='download2'>
                  {docs.case}
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
