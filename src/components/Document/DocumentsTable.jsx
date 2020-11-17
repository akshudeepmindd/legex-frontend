import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Table, Modal, Popconfirm, message } from "antd";
import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { deleteDocument } from "../../store/actions/documents";
const { confirm } = Modal;

const textPopConfirm = "Are you sure to delete this document?";

function DocumentsTable({ documents, dispatch }) {
  const [columns] = useState([
    {
      title: "Name",
      key: "name",
      width: 200,
      render: (doc) => {
        return (
          <a target="blank" href={doc.url}>
            {doc.name}
          </a>
        );
      },
    },
    {
      title: "Actions",
      width: 200,
      key: "actions",
      render: (doc) => (
        <Popconfirm
          placement="right"
          title={textPopConfirm}
          onConfirm={() => {
            dispatch(deleteDocument(doc._id));
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteFilled />} />
        </Popconfirm>
      ),
    },
  ]);

  return (
    <Table
      columns={columns}
      dataSource={documents}
      scroll={{ x: 400, y: 300 }}
    />
  );
}

DocumentsTable.propTypes = {
  documents: PropTypes.array.isRequired,
};

const mapStateToProps = (_, ownProps) => ({
  documents: ownProps.documents,
});

export default connect(mapStateToProps)(DocumentsTable);
