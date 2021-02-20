import React, { useState } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { MediatorDashboardLayout } from '../../../layouts'
import UserAvatar from '../../../assets/images/useravtar.png'
import pencil from '../../../assets/images/Subtract.png'
import { connect } from 'react-redux'
import { editUser } from '../../../store/actions/user'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
] // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
}

const { Option } = Select
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 12,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const MediatorSettings = ({ user, dispatch }) => {
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    console.log('Received values of form: ', values)
    await dispatch(
      editUser({
        ...values,
      })
    )
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    </Form.Item>
  )
  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(
        ['.com', '.org', '.net'].map((domain) => `${value}${domain}`)
      )
    }
  }

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }))
  return (
    <MediatorDashboardLayout>
      <div className='settings'>
        <Row>
          <Col span={6} className='userprofile'>
            <div className='flex'>
              <img src={UserAvatar} alt='avatar' />
              <div className=''>
                <p
                  style={{
                    textTransform: 'capitalize',
                  }}
                >{`${user?.firstName} ${user?.lastName}`}</p>
                <span className='pencil-image'>
                  <img src={pencil} /> Update
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Form
          className='form-input'
          {...formItemLayout}
          form={form}
          name='userprofile'
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
            firstName: user?.firstName,
          }}
          scrollToFirstError
        >
          <Form.Item
            name='firstName'
            label='First Name'
            rules={[
              {
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input
              type='text'
              placeholder='Firstname'
              value={user?.firstName}
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            label='Last Name'
            rules={[
              {
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input type='text' placeholder='lastname' />
          </Form.Item>
          <Form.Item
            name='bio'
            label='Bio'
            rules={[
              {
                message: 'The input is not valid Bio!',
              },
            ]}
          >
            <Input type='text' placeholder='Bio' />
          </Form.Item>
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input type='email' placeholder='Email' />
          </Form.Item>

          <Form.Item label='Phone Number' style={{ marginBottom: 0 }}>
            <Form.Item
              name='phone'
              rules={[
                {
                  message: 'Please input your phone number!',
                },
              ]}
              style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}
            >
              <Input
                name='phone'
                addonBefore={prefixSelector}
                style={{
                  width: '200%',
                }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: 'inline-block',
                width: 'calc(30% - 8px)',
                margin: '0 8px',
              }}
            >
              <Button type='primary' htmlType='submit' className='btn-reg'>
                Save and Update
              </Button>
            </Form.Item>
          </Form.Item>

          <Form.Item label='Password' style={{ marginBottom: 0 }} hasFeedback>
            <Form.Item
              name='password'
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input
                type='password'
                placeholder='Enter password'
                name='password'
              />
            </Form.Item>
            <Form.Item
              name='password2'
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <Input
                type='password'
                placeholder='reenter password'
                name='confirm-password'
              />
            </Form.Item>
            <Form.Item
              style={{
                display: 'inline-block',
                width: 'calc(30% - 8px)',
                margin: '0 8px',
              }}
            >
              <Button type='primary' htmlType='submit' className='btn-reg'>
                Update Password
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </MediatorDashboardLayout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  organization: state.organization,
  user: state.user,
  organizationId: ownProps.match.params.organizationId,
  history: ownProps.history,
  caseTypes: state.caseTypes.caseTypes,
  organizations: state.organizations,
  cases: state.cases,
  hearings: state.hearings,
})

export default connect(mapStateToProps)(MediatorSettings)
