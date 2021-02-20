import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import UploadForm from '../../../components/Document/UploadForm'
import $http from '../../../utils/api'
import { connect } from 'react-redux'
const { Dragger } = Upload
const HearingForm = ({ onFinish, user }) => {
  const [loading, setLoading] = useState(false)
  const [documentId, setdocumentId] = useState('')
  const [fileList, updateFileList] = useState([])

  const onSubmitHandleClick = async (values) => {
    setLoading(true)
    await onFinish(documentId, values)
    setLoading(false)
  }
  const beforeUpload = (file) => {
    updateFileList([...fileList, file])
    const fd = new FormData()
    fd.append('files', file)
    fd.append('creater', user._id)
    fd.append('createrType', 'User')
    $http()({
      url: 'documents/upload',
      method: 'post',
      processData: false,
      data: fd,
    })
      .then((res) => {
        console.log(res?.data?.data[0]?._id, 'resss')
        setdocumentId(res?.data?.data[0]?._id)
        return true
      })
      .catch(() => {
        // message.error('upload failed.')
        return false
      })
    return false
  }

  return (
    <Form name='AddhearingForm' onFinish={onSubmitHandleClick}>
      <Form.Item
        name='startDateTime'
        rules={[{ required: true, message: 'Please input the Date and Time' }]}
      >
        <Input type='datetime-local' placeholder='start Date and Time' />
      </Form.Item>
      <Form.Item
        name='remark'
        rules={[{ required: true, message: 'Please input the Remark' }]}
      >
        <Input type='text' placeholder='Remark' />
      </Form.Item>
      <Form.Item>
        <Form.Item name='file'>
          <Upload
            // onRemove={onRemove}
            beforeUpload={beforeUpload}
            fileList={fileList}
            accept='.jpeg, .jpg, .png, .pdf'
            className='upload'
          >
            <Button className='upload-btn' icon={<UploadOutlined />}>
              Select File
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          style={{
            textAlign: 'end',
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            disabled={loading}
            loading={loading}
          >
            Add Hearing
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

HearingForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  caseData: state.case,
  casesData: state.cases,
  user: state.user,
  organization: state.organization,
  organizations: state.organizations,
})
export default connect(mapStateToProps)(HearingForm)
