import React, { useState } from "react"
import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"

export default function UploadForm({ formData, onUpload }) {
	const [fileList, updateFileList] = useState([])
	const [isUploading, setUplaoding] = useState(false)

	const handleUpload = async () => {
		const formData = new FormData()
		fileList.forEach((file) => {
			formData.append("files", file)
		})
		setUplaoding(true)
		if (await onUpload(formData)) {
			updateFileList([])
			setUplaoding(false)
		} else {
			setUplaoding(false)
		}
	}
	const onRemove = (file) => {
		const index = fileList.indexOf(file)
		const newFileList = fileList.slice()
		newFileList.splice(index, 1)
		updateFileList(newFileList)
	}
	const beforeUpload = (file) => {
		updateFileList([...fileList, file])
		return false
	}

	return (
		<>
			<Upload
				onRemove={onRemove}
				beforeUpload={beforeUpload}
				fileList={fileList}
				accept=".jpeg, .jpg, .png, .pdf"
			>
				<Button icon={<UploadOutlined />}>Select File</Button>
			</Upload>
			<Button
				type="primary"
				onClick={handleUpload}
				disabled={fileList.length === 0}
				loading={isUploading}
				style={{ marginTop: 16 }}
			>
				{isUploading ? "Uploading" : "Start Upload"}
			</Button>
		</>
	)
}
