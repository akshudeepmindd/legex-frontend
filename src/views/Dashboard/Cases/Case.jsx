import React, { useState, useEffect } from "react"
import { Row, Col, Button, Card, Steps, List, Modal, Comment, Avatar, message } from "antd"
import { UserOutlined, EditOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
import { useParams, Link } from "react-router-dom"

import { DashboardLayout } from "../../../layouts"

import { CaseHeader, InviteForm, HearingForm, VerdictForm } from "../../../components"
import { fetchCase, inviteParty } from "../../../store/actions/case"
import { fetchUser } from "../../../store/actions/user"
import { fetchOrganizations } from "../../../store/actions/organizations"
import UploadForm from "../../../components/Document/UploadForm"
import $http from "../../../utils/api"

const { Step } = Steps

const Case = ({ dispatch, caseData, user, organizations }) => {
	const [hearingModal, setHearingModal] = useState(false)
	const [inviteModal, setInviteModal] = useState(false)
	const [documentModal, setDocumentModal] = useState(false)
	const [verdictModal, setVerdictModal] = useState(false)

	//store details about how the case is being accessed by the user
	const [access, updateAccess] = useState(null)
	const { caseId } = useParams()
	//initial data fetch
	useEffect(() => {
		dispatch(fetchCase(caseId))
		dispatch(fetchUser())
		dispatch(fetchOrganizations())
	}, [dispatch, caseId])
	//find out how the case is being accessed by user
	// This will work if the user is connected to case directly or through a organization
	// but not both
	useEffect(() => {
		if (user && caseData) {
			let type = "Organization"
			let id
			let access = false
			for (let i = 0; i < caseData.members.length; i++) {
				if (user._id === caseData.members[i]._id) {
					type = "User"
					break
				}
			}

			if (type === "User") {
				id = user._id
				access = true
			} else
				for (let i = 0; i < caseData.organizations.length; i++) {
					for (let j = 0; j < caseData.organizations[i].members.length; j++) {
						if (caseData.organizations[i].members[j] === user._id) {
							id = caseData.organizations[i]._id
							if (user._id === caseData.organizations[i].owner) {
								access = true
							}
							break
						}
					}
				}
			updateAccess({ type, id, access })
		}
	}, [user, caseData])

	const showInviteModal = () => setInviteModal(true)

	const showDocumentModal = () => setDocumentModal(true)

	const showVerdictModal = () => setVerdictModal(true)

	const handleOk = (e) => setHearingModal(false) && setInviteModal(false) && setDocumentModal(false)

	const handleCancel = (e) =>
		setHearingModal(false) && setInviteModal(false) && setDocumentModal(false)

	const onDocumentUploadClick = (fd) => {
		fd.append("creater", user._id)
		fd.append("createrType", "User")
		$http()({
			url: "documents/upload",
			method: "post",
			processData: false,
			data: fd,
		})
			.then((res) => {
				message.success("upload successfully.")
				return true
			})
			.catch(() => {
				message.error("upload failed.")
				return false
			})
	}

	const Conditionally = () => (
		<>
			<Col xs={24} sm={24} md={24} lg={24} xl={24}>
				<Card
					bordered={false}
					title="Case Parties"
					actions={[
						access && access.access && (
							<Button icon={<EditOutlined />} block type="primary" onClick={showInviteModal}>
								Send Invite
							</Button>
						),
					]}
				/>
			</Col>
			<Col xs={24} sm={24} md={24} lg={24} xl={24}>
				<Card
					bordered={false}
					title="Case Documents"
					actions={[
						access && access.access && (
							<Button icon={<EditOutlined />} block type="primary" onClick={showDocumentModal}>
								Add Document
							</Button>
						),
					]}
				/>
			</Col>
		</>
	)

	const onInvitationFormSubmit = (values) =>
		dispatch(
			inviteParty({
				senderType: access.type,
				sender: access.id,
				invitationType: "Case",
				case: caseId,
				...values,
			})
		)
	
	const checkCurrent = () => {
		if(caseData.status == "creation")
			return 1;
		else if(caseData.status == "invitations")
			return 2;
		else if(caseData.status == "assignment")
			return 3;
		else if(caseData.status == "hearings")
			return 4;
		else 
			return 5;
	}
	return (
		<DashboardLayout>
			{caseData ? (
				<>
					<Row
						gutter={[
							{ xs: 8, sm: 16, md: 24, lg: 32 },
							{ xs: 8, sm: 16, md: 24, lg: 32 },
						]}
					>
						<Col xs={24} sm={24} md={16} lg={16} xl={16}>
							<Row
								gutter={[
									{ xs: 8, sm: 16, md: 24, lg: 32 },
									{ xs: 8, sm: 16, md: 24, lg: 32 },
								]}
							>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<CaseHeader caseData={caseData} showVerdictModal={showVerdictModal} />
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Row
										gutter={[
											{ xs: 8, sm: 16, md: 24, lg: 32 },
											{ xs: 8, sm: 16, md: 24, lg: 32 },
										]}
									>
										<Col xs={24} sm={24} md={12} lg={12} xl={12}>
											<Card bordered={false} title="Case Timeline">
												<Steps size="small" current={checkCurrent} status="error" direction="vertical">
													<Step title="Creation" />
													<Step title="Invitations" />
													<Step title="Assignment" />
													<Step title="Hearings" />
													<Step title="Completion" />
												</Steps>
											</Card>
										</Col>
										<Col xs={24} sm={24} md={12} lg={12} xl={12}>
											<Row
												gutter={[
													{ xs: 8, sm: 16, md: 24, lg: 32 },
													{ xs: 8, sm: 16, md: 24, lg: 32 },
												]}
											>
												<Conditionally />
												<Col xs={24} sm={24} md={24} lg={24} xl={24}>
													<Card bordered={false} title="Case Hearing">
														<List>
															<List.Item />
														</List>
													</Card>
												</Col>
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Card title="Case Forum" bordered={false} style={{ height: "80vh" }}>
								<Comment
									actions={[<span key="comment-basic-reply-to">Reply to</span>]}
									author={<Link to="/s">Han Solo</Link>}
									avatar={
										<Avatar
											size="large"
											icon={<UserOutlined />}
											className="avatar-placeholder"
											shape="square"
										/>
									}
									content={
										<p>
											We supply a series of design principles, practical patterns and high quality
											design resources (Sketch and Axure), to help people create their product
											prototypes beautifully and efficiently.
										</p>
									}
									datetime={new Date(caseData.createdAt).toLocaleDateString()}
								/>
							</Card>
						</Col>
					</Row>

					<Modal
						title="Hearing Form"
						visible={hearingModal}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<HearingForm />
					</Modal>

					<Modal
						title="Invite Form"
						visible={inviteModal}
						onCancel={() => setInviteModal(false)}
						footer={null}
					>
						<InviteForm onFinish={onInvitationFormSubmit} />
					</Modal>

					<Modal
						title="Document Form"
						visible={documentModal}
						onCancel={() => setDocumentModal(false)}
						footer={null}
					>
						<UploadForm onUpload={onDocumentUploadClick} />
					</Modal>

					<Modal
						title="Verdict Form"
						visible={verdictModal}
						onOk={handleOk}
						onCancel={() => setVerdictModal(false)}
						footer={null}
					>
						<VerdictForm />
					</Modal>
				</>
			) : (
				"loading..."
			)}
		</DashboardLayout>
	)
}

const mapStateToProps = (state) => ({
	caseData: state.case,
	user: state.user,
	organization: state.organization,
	organizations: state.organizations,
})

export default connect(mapStateToProps)(Case)
