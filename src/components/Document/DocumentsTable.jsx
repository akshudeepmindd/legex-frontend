import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button, Table } from "antd"
import { DeleteFilled } from "@ant-design/icons"
import { connect } from "react-redux"
import { deleteDocument } from "../../store/actions/documents"
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
				)
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
						dispatch(deleteDocument(doc._id))
					}}
				/>
			),
		},
	])

	return <Table columns={columns} dataSource={documents} scroll={{ x: 400, y: 300 }} />
}

DocumentsTable.propTypes = {
	documents: PropTypes.array.isRequired,
}

const mapStateToProps = (_, ownProps) => ({
	documents: ownProps.documents,
})

export default connect(mapStateToProps)(DocumentsTable)
