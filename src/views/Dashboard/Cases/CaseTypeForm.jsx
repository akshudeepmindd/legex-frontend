import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  Dropdown,
  Menu,
  Steps,
  Button,
  message,
  Select,
} from 'antd'
import { connect } from 'react-redux'

const CaseTypeForm = ({ caseTypes, value, handleSelectCaseType }) => {
  return (
    <Row className='mt-2'>
      <Col span={8}>Case Type:</Col>
      <Col span={16}>
        {' '}
        <Select
          name='caseType'
          placeholder='Select a caseType'
          onChange={handleSelectCaseType}
        >
          {caseTypes?.length > 0
            ? caseTypes?.map((item, index) => (
                <Select.Option value={item._id} key={index}>
                  {item.name}
                </Select.Option>
              ))
            : 'null'}
        </Select>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
})

export default connect(mapStateToProps)(CaseTypeForm)
