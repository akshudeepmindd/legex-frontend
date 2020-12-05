import React from "react"
import { PageHeader, Tag, Button, Descriptions, Popconfirm } from "antd"
import PropTypes from "prop-types"
import { quitCase } from "../../store/actions/case"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

const textPopConfirm = "Are you sure to delete this document?"
const CaseHeader = ({ caseData, showVerdictModal, access }) => {
	const dispatch = useDispatch()
	const { caseId } = useParams()
	const history = useHistory()

	const handleQuit = async () => {
		await dispatch(quitCase(caseId))
		history.push(`/dashboard/cases/`)
	}

	return (
		<PageHeader
			ghost={false}
			title={caseData.title}
			subTitle={<a target="blank" href={caseData.meetingUrl}>meeting url</a>}
			tags={<Tag color="blue">{caseData.status}</Tag>}
			extra={[
				access && access.access && (
					<Popconfirm
						placement="right"
						onConfirm={handleQuit}
						title={textPopConfirm}
						okText="Yes"
						cancelText="No"
					>
						<Button key="2" type="primary" style={{ background: "red", borderColor: "red" }}>
							Quit Case
						</Button>
					</Popconfirm>
				),
			]}
		>
			<Descriptions size="small" column={1}>
				<Descriptions.Item label="Description">{caseData.description}</Descriptions.Item>
				<Descriptions.Item label="Creation Time">
					{new Date(caseData.createdAt).toLocaleDateString()}
				</Descriptions.Item>
				<Descriptions.Item label="Est Time">
					{new Date(caseData.updatedAt).toLocaleDateString()}
				</Descriptions.Item>
			</Descriptions>
		</PageHeader>
	)
}

// const mapStateToProps = (state) => ({
//   caseData: state.case,
// })

CaseHeader.propTypes = {
	showVerdictModal: PropTypes.func.isRequired,
	caseData: PropTypes.instanceOf(Object).isRequired,
}

export default CaseHeader
