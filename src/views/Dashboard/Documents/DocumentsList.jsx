import React from 'react'
import { Row, Col, PageHeader, Button, Card, Menu, Dropdown } from 'antd'

import { DashboardLayout } from '../../../layouts'
import DocumentsTable from '../../../components/Document/DocumentsTable'
import { connect } from 'react-redux'
import UploadForm from '../../../components/Document/UploadForm'
import { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { uploadDocument } from '../../../store/actions/documents'
import { DownOutlined } from '@ant-design/icons'
import PDF from '../../../assets/images/Document upload icon.png'

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='http://www.alipay.com/'>1st menu item</a>
    </Menu.Item>
    <Menu.Item key='1'>
      <a href='http://www.taobao.com/'>2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='3'>3rd menu item</Menu.Item>
  </Menu>
)
const DocumentsList = ({ user, history, dispatch }) => {
  const [uploadFormVisbility, setUploadFormVisibility] = useState(false)
  const onDocumentUploadClick = async (formData) => {
    formData.append('creater', user._id)
    formData.append('createrType', 'User')
    const res = await dispatch(uploadDocument(formData))
    setUploadFormVisibility(!res)
    return res
  }

  return (
    <DashboardLayout>
      {user ? (
        <>
          {/* <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <PageHeader
                ghost={false}
                onBack={() => history.push("/dashboard/overview")}
                title="Documents"
                extra={
                  <Row
                    gutter={[
                      { xs: 8, sm: 12, md: 12, lg: 12 },
                      { xs: 8, sm: 0, md: 0, lg: 0 },
                    ]}
                  >
                    <Col>
                      <Button onClick={() => setUploadFormVisibility(true)}>
                        Upload
                      </Button>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
          <Card>
            <DocumentsTable documents={user.documents} />
          </Card>

          <Modal
            title="Upload Document"
            visible={uploadFormVisbility}
            onCancel={() => setUploadFormVisibility(false)}
            footer={null}
            destroyOnClose={true}
          >
            <UploadForm onUpload={onDocumentUploadClick} />
          </Modal> */}
          <Row>
            <Col flex='1 1 400px'>
              <Dropdown
                overlay={menu}
                trigger={['click']}
                className='dropdown-organize'
              >
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => e.preventDefault()}
                >
                  Arohan Infra Private Limited <DownOutlined />
                </a>
              </Dropdown>
              <div className='address'>
                <div>
                  <label>Industry:</label>
                  <span className=''> Real Estate and Construction</span>
                </div>
                <div>
                  <label>Owner: </label>
                  <span className=''> Arohan Gupta</span>
                </div>
                <div>
                  <label>CIN: </label>
                  <span className=''> U7012PTC2022IN123456</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='pdf-image'>
            <Col span={4}>
              <img src={PDF} />
            </Col>
            <Col span={4}>
              <img src={PDF} />
            </Col>
            <Col span={4}>
              <img src={PDF} />
            </Col>
            <Col span={4}>
              <img src={PDF} />
            </Col>
            <Col span={4}>
              <img src={PDF} />
            </Col>
            <Col span={4}>
              <img src={PDF} />
            </Col>
          </Row>
        </>
      ) : (
        'loading'
      )}
    </DashboardLayout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  user: state.user,
})
export default connect(mapStateToProps)(DocumentsList)
