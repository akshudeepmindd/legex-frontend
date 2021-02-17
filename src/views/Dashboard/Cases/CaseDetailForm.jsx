import React, { useState } from 'react'
import { Input, Col, Row, Select } from 'antd'
import { connect } from 'react-redux'
import { type, status } from '../../../utils/constants'

const CaseDetailForm = ({
  caseTypes,
  value,
  handleChange,
  handleSelectType,
  handleSelectProvider,
  handleSelectStatus,
}) => {
  return (
    <Col>
      <Row className='mt-2'>
        <Col span={8}>Type:</Col>
        <Col span={16}>
          {' '}
          <Select
            placeholder='Select a caseType'
            onChange={handleSelectType}
            name='type'
          >
            {type?.length > 0
              ? type?.map((item, index) => (
                  <Select.Option value={item.value} key={index}>
                    {item.title}
                  </Select.Option>
                ))
              : 'null'}
          </Select>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>Provider:</Col>
        <Col span={16}>
          {' '}
          <Input
            name='Provider'
            value={value.provider}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>Reference No:</Col>
        <Col span={16}>
          {' '}
          <Input
            name='referenceNo'
            value={value.referenceNo}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>Claim Amount:</Col>
        <Col span={16}>
          {' '}
          <Input
            name='claimAmount'
            value={value.claimAmount}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>status:</Col>
        <Col span={16}>
          <Select
            placeholder='Select a Status'
            onChange={handleSelectStatus}
            name='status'
          >
            {status?.length > 0
              ? status?.map((item, index) => (
                  <Select.Option value={item.value} key={index}>
                    {item.title}
                  </Select.Option>
                ))
              : 'null'}
          </Select>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>Additional Details:</Col>
        <Col span={16}>
          {' '}
          <Input
            name='additionalDetails'
            value={value.additionalDetails}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>Supporting Documents:</Col>
        <Col span={16}>
          {' '}
          <Input
            name='supportingDocuments'
            value={value.supportingDocuments}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
    </Col>
  )
}

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
})

export default connect(mapStateToProps)(CaseDetailForm)
