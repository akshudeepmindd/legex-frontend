import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

const SuspendForm = ({ onFinish }) => {
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
        rules={[{ required: true, message: 'Please input the Suspend Update' }]}
      >
        <Input type='textarea' placeholder='Suspend' />
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

SuspendForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
}

export default SuspendForm
