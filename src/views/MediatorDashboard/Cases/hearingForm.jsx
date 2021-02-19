import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import UploadForm from '../../../components/Document/UploadForm'

const { Dragger } = Upload
const HearingForm = ({ onFinish }) => {
  const [loading, setLoading] = useState(false)
  const onSubmitHandleClick = async (values) => {
    setLoading(true)
    await onFinish(values)
    setLoading(false)
  }
  return (
    <Form name='AddMemForm' onFinish={onSubmitHandleClick}>
      <Form.Item
        name='startDateTime'
        rules={[{ required: true, message: 'Please input the Verdict' }]}
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
            // beforeUpload={beforeUpload}
            // fileList={fileList}
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

export default HearingForm
