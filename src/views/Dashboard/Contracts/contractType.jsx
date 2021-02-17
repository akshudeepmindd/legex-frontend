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
  Upload,
  Input,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { contracttype } from '../../../utils/constants'

const CaseTypeForm = ({
  caseTypes,
  value,
  handleSelect,
  handleChange,
  updateFileList,
  fileList,
  contractType,
}) => {
  const onRemove = (file) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    updateFileList(newFileList)
  }
  const [expiryCheck, setexpiryCheck] = useState(false)
  const beforeUpload = (file) => {
    updateFileList([...fileList, file])
    return false
  }
  return (
    <>
      <Row className='mt-2'>
        <Col span={8}>Contract Type:</Col>
        <Col span={16}>
          {' '}
          <Select
            name='caseType'
            placeholder='Select a caseType'
            onChange={(value) => handleSelect(value)}
            defaultValue='Select a Contract Value'
            value={contractType}
          >
            {contracttype?.length > 0
              ? contracttype?.map((item, index) => (
                  <Select.Option value={item.title} key={index}>
                    {item.title}
                  </Select.Option>
                ))
              : 'null'}
          </Select>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col span={8}>Has an expiry?:</Col>
        <Col span={16}>
          {' '}
          <Select
            name='caseType'
            placeholder='Select ...'
            onChange={setexpiryCheck}
          >
            <Select.Option value='yes'>Yes</Select.Option>
            <Select.Option value='no'>No</Select.Option>
            ))
          </Select>
        </Col>
      </Row>
      {expiryCheck == 'yes' && (
        <Row className='mt-2'>
          <Col span={8}>Expiry:</Col>
          <Col span={16}>
            <Input
              name='expiry'
              value={value.expiry}
              type='date'
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
      )}
      <Row>
        <div className='step-content'>
          <Row className='mt-2'>
            <Col span={8}>Scanned copy of Contract:</Col>
            <Col span={16}>
              <Upload
                onRemove={onRemove}
                beforeUpload={beforeUpload}
                fileList={fileList}
                accept='.jpeg, .jpg, .png, .pdf'
                className='upload'
              >
                <Button className='upload-btn' icon={<UploadOutlined />}>
                  Select File
                </Button>
              </Upload>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  cases: state.cases,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  user: state.user,
})

export default connect(mapStateToProps)(CaseTypeForm)
