import React from 'react'
import { Row, Col } from 'antd'
import UserAvatar from '../../../assets/images/useravtar.png'
import Plus from '../../../assets/images/plus.png'
export default () => {
  return (
    <>
      <Row>
        <Col span={12} className='userprofile'>
          <Row>
            <img src={UserAvatar} alt='avatar' />
            <p>Welcome, Arohan Gupta</p>
          </Row>
        </Col>
        <Col span={12} className='pluscase'>
          <Row className='plus-row'>
            <img src={Plus} alt='plus' />
            <p>Add Case</p>
          </Row>
        </Col>
      </Row>
      <Row className='case-number-row'>
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
    </>
  )
}
