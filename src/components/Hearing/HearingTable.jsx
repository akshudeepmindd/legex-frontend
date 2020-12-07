import React from "react"
import { Table, Typography } from "antd"
import "./tablestyles.css"
import "antd/dist/antd.css"
import moment from "moment"

const { Text } = Typography

function HearingsTable({ hearings }) {
	const columns = [
		{
			title: "Date",
			key: "date",
			width: 100,
			dataIndex: "startDateTime",
			render: (sdt) => <Text>{moment(sdt).format("DD-MM-YYYY")}</Text>,
		},
		{
			title: "Time",
			dataIndex: "startDateTime",
			width: 100,
			key: "time",
			render: (sdt) => <Text>{moment(sdt).format("hh:mm:ss A")}</Text>,
		},
		{
			title: "Duration",
			dataIndex: "duration",
			width: 100,
			key: "duration",
			render: (duration) => <Text>{duration || "--"}</Text>,
		},
		{
			title: "Docs",
			dataIndex: "documents",
			width: 100,
			key: "docs",
			render: (documents) => (
				<Text>
					{documents.map((d, index) => (
						<a target="_blank" key={index} rel="noopener noreferrer" href={d.url}>
							{d.name} {index < documents.length - 1 && ","}
						</a>
					))}
				</Text>
			),
		},
	]

	return <Table rowClassName={() => "rowClassName1"} columns={columns} dataSource={hearings} scroll={{ x: 400, y: 600 }} />
}

export default HearingsTable
