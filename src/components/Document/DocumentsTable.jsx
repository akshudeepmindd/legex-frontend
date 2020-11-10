import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Table, Modal } from "antd";
import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { deleteDocument } from "../../store/actions/documents";
const { confirm } = Modal;

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
        <Button
          icon={<DeleteFilled />}
          onClick={() => {
            //dispatch(deleteDocument(doc._id));
            confirm({
              title: "Do you want to delete these item?",
              icon: <ExclamationCircleOutlined />,
              content: "It will be deleted permanently!",
              onOk() {
                dispatch(deleteDocument(doc._id));
              },
              onCancel() {
                console.log("Cancel");
              },
            });
          }}
        />
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
