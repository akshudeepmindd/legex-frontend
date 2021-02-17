import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

const VerdictForm = ({ onFinish }) => {
  const [loading, setLoading] = useState(false)
  const onSubmitHandleClick = async (values) => {
    setLoading(true)
    await onFinish(values)
    setLoading(false)
  }
  return (
    <Form name='AddMemForm' onFinish={onSubmitHandleClick}>
      <Form.Item
        name='verdict'
        rules={[{ required: true, message: 'Please input the Verdict' }]}
      >
        <Input type='textarea' placeholder='Verdict' />
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
          Make Verdict
        </Button>
      </Form.Item>
    </Form>
  )
}

VerdictForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
}

export default VerdictForm
