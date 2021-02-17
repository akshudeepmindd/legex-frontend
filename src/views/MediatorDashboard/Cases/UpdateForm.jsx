import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

const UpdateForm = ({ onFinish }) => {
  const [loading, setLoading] = useState(false)
  const onSubmitHandleClick = async (values) => {
    setLoading(true)
    await onFinish(values)
    setLoading(false)
  }
  return (
    <Form name='UpdateForm' onFinish={onSubmitHandleClick}>
      <Form.Item
        name='update'
        rules={[{ required: true, message: 'Please input the Update' }]}
      >
        <Input type='textarea' placeholder='Update' />
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
          Send Update
        </Button>
      </Form.Item>
    </Form>
  )
}

UpdateForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
}

export default UpdateForm
