import React from 'react';
import { Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Dragger } = Upload;

const DocumentForm = ({ onFinish }) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Form.Item>
    </Form>
  );
};

DocumentForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

Document.defaultProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
};

export default DocumentForm;
