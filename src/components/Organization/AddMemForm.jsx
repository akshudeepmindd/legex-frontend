import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

const AddMemForm = ({ onFinish }) => {
  const [loading, setLoading] = useState(false)
  const onSubmitHandleClick = async (values) => {
    setLoading(true)
    await onFinish(values)
    setLoading(false)
  }
  return (
    <Form name='AddMemForm' onFinish={onSubmitHandleClick}>
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input the Member Name!' }]}
      >
        <Input type='text' placeholder='Name' />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input the Member Email!' }]}
      >
        <Input type='text' placeholder='Email Address' />
      </Form.Item>
      <Form.Item
        name='designation'
        rules={[
          { required: true, message: 'Please input the Member Designation!' },
        ]}
      >
        <Input type='text' placeholder='Designation' />
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
          Add Member
        </Button>
      </Form.Item>
    </Form>
  )
}

AddMemForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
}

export default AddMemForm
