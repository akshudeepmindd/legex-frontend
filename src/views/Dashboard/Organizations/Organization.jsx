import React, { useState } from "react"
import {
	Row,
	Col,
	PageHeader,
	Descriptions,
	Button,
	Menu,
	Dropdown,
	Space,
	Badge,
	Modal,
} from "antd"
import { DownOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
import { DashboardLayout } from "../../../layouts"
import {
	deleteOrganization,
	updateOrganization,
	inviteMember,
	leaveOrganization,
	fetchOrganization,
	createCase,
} from "../../../store/actions/organization"
import MembersTable from "../../../components/Organization/MembersTable"
import { OrganizationForm, AddMemForm, CasesTable, CaseForm } from "../../../components"
import { useEffect } from "react"
import { respondInvite } from "../../../store/actions/invites"
//CSS
import "antd/dist/antd.css"
import "./Organization.css"
import DocumentsTable from "../../../components/Document/DocumentsTable"
import UploadForm from "../../../components/Document/UploadForm"
import { uploadDocument } from "../../../store/actions/documents"

const Organization = ({ dispatch, organization, organizationId, user, history, caseTypes }) => {
	useEffect(() => {
		dispatch(fetchOrganization(organizationId))
	}, [organizationId, dispatch])

	// const [invites, setInvites] = useState([])

	// useEffect(() => {
	// 	organization && setInvites(organization.invites.filter((i) => i.status === "waiting"))
	// }, [organization])

	const handleDelete = async () => {
		if (await dispatch(deleteOrganization(organizationId))) history.push("/dashboard/organizations")
	}
	const renderMembers = () => (
		<MembersTable
			members={organization.members}
			owner={organization.owner}
			user={user._id}
			organizationId={organizationId}
		/>
	)
	const handleLeave = async () => {
		if (await dispatch(leaveOrganization({ organizationId, data: { uid: user._id } })));
		history.push("/dashboard/organizations")
	}

	const renderCases = () => <CasesTable cases={organization.cases} />

	const [updateOrganizationModal, setUpdateOrganizationModal] = useState(false)
	const [inviteMemberModalVisibility, setInviteMemberModalVisibilty] = useState(false)
	const [createCaseModalVisibility, setCreateCaseModalVisibilty] = useState(false)

	const onUpdateFinish = async (values) =>
		await dispatch(
			updateOrganization({
				organizationId,
				data: values,
			})
		)

	const onInviteMemberFinish = async (values) =>
		(await dispatch(
			inviteMember({
				senderType: "Organization",
				sender: organizationId,
				receiverType: "User",
				invitationType: "Organization",
				...values,
			})
		)) && setInviteMemberModalVisibilty(false)

	const onCreateCaseFinish = async (values) =>
		await dispatch(
			createCase({
				createrType: "Organization",
				creater: organization._id,
				...values,
			})
		)

	const acceptConfirmation = ({ invite, message }) =>
		Modal.confirm({
			async onOk() {
				await dispatch(
					respondInvite({
						inviteId: invite._id,
						data: {
							response: "Accepted",
							invite: invite._id,
						},
					})
				)
			},
			async onCancel() {
				await dispatch(
					respondInvite({
						inviteId: invite._id,
						data: {
							response: "Declined",
							invite: invite._id,
						},
					})
				)
			},
			content: message,
			cancelText: "Decline",
			okText: "Accept",
		})

	const pendingInvitationsMenu = ({ invites }) => {
		return (
			<Menu>
				{invites.length > 0 ? (
					invites.map((invite) => {
						return (
							<Menu.Item
								key={invite._id}
								onClick={async () => {
									acceptConfirmation({
										invite,
										message: `Do you want to accept ${
											invite.senderType === "User"
												? `${invite.sender.firstName} ${invite.sender.lastName}`
												: invite.sender.name
										}`,
									})
								}}
							>
								{invite.sender.name || invite.sender.email}
							</Menu.Item>
						)
					})
				) : (
					<Menu.Item>No Pending Invites</Menu.Item>
				)}
			</Menu>
		)
	}

	//   const renderContentHeader = (column = 2) => (
	//     <Descriptions size="large" column={column}>
	//       <Descriptions.Item label="Domain">
	//         <a href={organization.domain}>{organization.domain}</a>
	//       </Descriptions.Item>
	//       <Descriptions.Item label="Creation Time">
	//         {new Date(organization.createdAt).toLocaleDateString()}
	//       </Descriptions.Item>
	//       <Descriptions.Item label="Owner">
	//         {`${organization.owner.firstName} ${organization.owner.lastName}(${organization.owner.email})`}
	//       </Descriptions.Item>
	//     </Descriptions>
	//   );
	const [uploadFormVisbility, setUploadFormVisibility] = useState(false)
	const onDocumentUploadClick = async (formData) => {
		formData.append("creater", organization._id)
		formData.append("createrType", "Organization")
		return await dispatch(uploadDocument(formData))
	}
	function Conditionally() {
		if (organization.owner._id === user._id) {
			return (
				<>
					<Button key="2" type="danger" onClick={handleDelete}>
						Delete
					</Button>
					<Button key="1" type="primary" onClick={() => setUpdateOrganizationModal(true)}>
						Update
					</Button>
				</>
			)
		}
		return (
			<>
				<Button onClick={handleLeave} type="danger">
					Leave
				</Button>
			</>
		)
	}

	function MemberTableButtons() {
		if (organization.owner._id === user._id) {
			return (
				<>
					<Button key="2" onClick={() => setInviteMemberModalVisibilty(true)} type="primary">
						Invite Member
					</Button>
				</>
			)
		}
		return <></>
	}

	function CasesTableButtons() {
		if (organization.owner._id === user._id) {
			return (
				<>
					<Dropdown
						key="3"
						overlay={pendingInvitationsMenu({
							invites: organization.invites,
						})}
						trigger={["click"]}
					>
						<Button>
							<Space direction="horizontal">
								<Badge count={organization.invites.length} overflowCount={9} showZero={false} />
								Pending Invitations
								{organization.invites.length > 0 && <DownOutlined />}
							</Space>
						</Button>
					</Dropdown>
					<Button key="2" type="primary" onClick={() => setCreateCaseModalVisibilty(true)}>
						New Case
					</Button>
				</>
			)
		}
		return <></>
	}

	return (
		<>
			{organization && user ? (
				<DashboardLayout>
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
									<PageHeader
										ghost={false}
										onBack={() => window.history.back()}
										title={organization.name}
										extra={[<Conditionally />]}
									>
										<Descriptions size="small" column={1}>
											<Descriptions.Item label="Domain">
												<a href={organization.domain}>{organization.domain}</a>
											</Descriptions.Item>
											<Descriptions.Item label="Creation Time">
												{new Date(organization.createdAt).toLocaleDateString()}
											</Descriptions.Item>
											<Descriptions.Item label="Owner">
												{`${organization.owner.firstName} ${organization.owner.lastName}(${organization.owner.email})`}
											</Descriptions.Item>
										</Descriptions>
									</PageHeader>
								</Col>
							</Row>
						</Col>
					</Row>

					<Row>
						<PageHeader
							ghost={false}
							//   onBack={() => window.history.back()}
							title="Members"
							subTitle="All Members"
							extra={[<MemberTableButtons />]}
						>
							{renderMembers()}
						</PageHeader>
					</Row>

					<Row>
						<PageHeader
							ghost={false}
							//   onBack={() => window.history.back()}
							title="Cases"
							subTitle="All Cases"
							extra={[<CasesTableButtons />]}
						>
							{renderCases()}
						</PageHeader>
					</Row>
					<Row>
						<PageHeader
							ghost={false}
							//   onBack={() => window.history.back()}
							title="Documents"
							subTitle="All Documents"
							extra={[
								organization.owner._id === user._id && (
									<Row>
										<Col>
											<Button onClick={() => setUploadFormVisibility(true)}>Upload</Button>
										</Col>
									</Row>
								),
							]}
						>
							<DocumentsTable documents={organization.documents} />
						</PageHeader>
					</Row>

					<Modal
						title="Organization Form"
						visible={updateOrganizationModal}
						onCancel={() => setUpdateOrganizationModal(false)}
						destroyOnClose={true}
						footer={null}
					>
						<OrganizationForm
							onFinish={onUpdateFinish}
							name={organization.name}
							domain={organization.domain}
						/>
					</Modal>

					<Modal
						title="Add Member"
						visible={inviteMemberModalVisibility}
						onCancel={() => setInviteMemberModalVisibilty(false)}
						footer={null}
						destroyOnClose={true}
					>
						<AddMemForm onFinish={onInviteMemberFinish} />
					</Modal>

					<Modal
						title="Case Form"
						visible={createCaseModalVisibility}
						onFinish={onCreateCaseFinish}
						onCancel={() => setCreateCaseModalVisibilty(false)}
					>
						<CaseForm onFinish={onCreateCaseFinish} caseTypes={caseTypes} />
					</Modal>
					<Modal
						title="Upload Document"
						visible={uploadFormVisbility}
						onCancel={() => setUploadFormVisibility(false)}
						footer={null}
						destroyOnClose={true}
					>
						<UploadForm onUpload={onDocumentUploadClick} />
					</Modal>
				</DashboardLayout>
			) : (
				"loading..."
			)}
		</>
	)
}

const mapStateToProps = (state, ownProps) => ({
	organization: state.organization,
	user: state.user,
	organizationId: ownProps.match.params.organizationId,
	history: ownProps.history,
	caseTypes: state.caseTypes.caseTypes,
})

export default connect(mapStateToProps)(Organization)
