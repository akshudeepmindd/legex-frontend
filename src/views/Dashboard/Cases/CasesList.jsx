import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

// ant design components
import {
	Row,
	Col,
	PageHeader,
	Modal,
	Button,
	Card,
	Empty,
	Typography,
	Menu,
	Badge,
	Dropdown,
	Space,
} from "antd"
import { AppstoreOutlined, DownOutlined, TableOutlined } from "@ant-design/icons"

// components
import { DashboardLayout } from "../../../layouts"
import { CaseCard, CasesTable, CaseForm } from "../../../components"

// redux actions
import { createCase, respondInvite } from "../../../store/actions/cases"

const { Text } = Typography

const CasesList = ({ dispatch, loading, cases, caseTypes, organizations, user }) => {
	const [view, setView] = useState(false)
	const [modal, setModal] = useState(false)
	const [invites, setInvites] = useState([])

	useEffect(() => {
		user &&
			setInvites(user.invites.filter((i) => i.invitationType == "Case" && i.status == "waiting"))
	}, [user])
	const showModal = () => {
		setModal(true)
	}

	const handleOk = () => {
		setModal(false)
	}

	const handleCancel = () => {
		setModal(false)
	}

	const toggleView = () => {
		setView(!view)
	}

	const onFinish = async (values) =>
		await dispatch(createCase({ createrType: "User", creater: user._id, ...values }))

	const pendingInvitationsMenu = ({ invites }) => {
		console.log(invites)
		let resp ;  
		let i;
		const acceptConfirmation = ({ message }) =>
			Modal.confirm({
				async onOk(){
				  console.log(i)
				  resp = "Accepted"
				  await dispatch(
					respondInvite({
					inviteId : i._id,
					data : {
					  resp : resp,
					  invite : i,
					}
					})
				  )
		
				},
				async onCancel(){
				  resp = "Declined"
				  await dispatch(
					respondInvite({
					inviteId : i._id,
					data : {
					  resp : resp,
					  invite : i,
					}
					})
				  )
		
				},
				content: message,
				cancelText: "Decline",
				okText: "Accept",
			  })
			return (
			  <Menu>
				{invites.length > 0 ? (
				  invites.map((invite) => {
					i=invite
					
					return (
					  <Menu.Item
						key={invite._id}
						onClick={ async () =>{
						  acceptConfirmation({
							message: `Do you want to accept ${invite.sender.name || invite.sender.email}'s invitation ?`,
						  })
						}
						}
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

	const renderCases = () => {
		// console.log(cases)
		if (cases.length > 0) {
			if (view) {
				return (
					<Row
						gutter={[
							{ xs: 8, sm: 16, md: 24, lg: 32 },
							{ xs: 8, sm: 16, md: 24, lg: 32 },
						]}
					>
						{cases.map((data) => (
							<Col xs={24} sm={24} md={8} lg={8} xl={8}>
								<CaseCard data={data} />
							</Col>
						))}
					</Row>
				)
			}
			return <CasesTable cases={cases} loading={loading} />
		}
		return (
			<Card bordered={false}>
				<Empty description={<Text>No Cases Found</Text>} />
			</Card>
		)
	}

	return (
		<DashboardLayout>
			{cases && caseTypes && organizations ? (
				<>
					<Row
						gutter={[
							{ xs: 8, sm: 16, md: 24, lg: 32 },
							{ xs: 8, sm: 16, md: 24, lg: 32 },
						]}
					>
						<Col>
							<PageHeader
								ghost={false}
								onBack={() => window.history.back()}
								title="Cases"
								subTitle="Manage all your cases"
								extra={[
									<Button
										key="2"
										icon={view ? <TableOutlined /> : <AppstoreOutlined />}
										onClick={toggleView}
									/>,
									<Button key="1" type="primary" onClick={showModal}>
										Create a new case
									</Button>,
									<Dropdown
										key="3"
										overlay={pendingInvitationsMenu({
											invites,
										})}
										trigger={["click"]}
									>
										<Button>
											<Space>
												<Badge count={invites.length} overflowCount={9} showZero={false} />
												Pending Invitations
												{invites.length > 0 && <DownOutlined />}
											</Space>
										</Button>
									</Dropdown>,
								]}
							/>
						</Col>
					</Row>

					{renderCases()}

					<Modal title="Case Form" visible={modal} onOk={handleOk} onCancel={handleCancel}>
						<CaseForm onFinish={onFinish} caseTypes={caseTypes} />
					</Modal>
				</>
			) : null}
		</DashboardLayout>
	)
}

const mapStateToProps = (state) => ({
	cases: state.cases,
	caseTypes: state.caseTypes.caseTypes,
	organizations: state.organizations,
	user: state.user,
})

export default connect(mapStateToProps)(CasesList)
