import React from "react"
import { Table, Typography } from "antd"
import "./tablestyles.css"
import "antd/dist/antd.css"
import { useState } from "react"
import { useEffect } from "react"

const { Text } = Typography

function CasePartiesTable({ members, organizations }) {
	const [parties, updateParties] = useState([])
	useEffect(() => {
		let parties = []
		members.forEach((m) => {
			parties.push({ type: "Member", name: `${m.firstName} ${m.lastName}(${m.email})` })
		})
		organizations.forEach((o) => {
			parties.push({ type: "Organization", name: o.name })
		})
		updateParties(parties)
	}, [members, organizations])
	const columns = [
		{
			title: "Party Name",
			key: "name",
			dataIndex: "name",
			width: 100,
			render: (name) => <Text>{name}</Text>,
		},
		{
			title: "Type",
			key: "type",
			width: 100,
			dataIndex: "type",
			render: (type) => <Text>{type}</Text>,
		},
	]

	return (
		<Table
			rowClassName={() => "rowClassName1"}
			columns={columns}
			dataSource={parties}
			scroll={{ x: 200, y: 300 }}
		/>
	)
}

export default CasePartiesTable
