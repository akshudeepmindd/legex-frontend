import React, { useEffect } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { fetchOrganizations } from "./store/actions/organizations"
import { fetchUser } from "./store/actions/user"
import { fetchCaseTypes } from "./store/actions/caseTypes"
import { fetchCases } from "./store/actions/cases"

import {
	Home,
	Clients,
	Help,
	Services,
	People,
	Login,
	Register,
	ForgotPassword,
	ResetPassword,
	Overview,
	CasesList,
	Case,
	DocumentsList,
	Document,
	OrganizationsList,
	Organization,
	Appointments,
} from "./views"

function App({ dispatch, auth }) {
	//all the initial data fetching happens here
	useEffect(() => {
		async function fetchData() {
			await dispatch(fetchUser())
			await dispatch(fetchOrganizations())
			await dispatch(fetchCaseTypes())
			await dispatch(fetchCases())
		}
		if (localStorage.getItem("access-token")) fetchData()
	}, [dispatch, auth])

	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/our-clients" component={Clients} />
				<Route path="/how-we-help-you" component={Help} />
				<Route path="/our-services" component={Services} />
				<Route path="/our-people" component={People} />

				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/forgot-password" component={ForgotPassword} />
				<Route path="/reset-password" component={ResetPassword} />

				<Route path="/dashboard/overview" component={Overview} />

				<Route path="/dashboard/cases" component={CasesList} exact />
				<Route path="/dashboard/cases/:caseId" component={Case} />

				<Route path="/dashboard/documents" component={DocumentsList} exact />
				<Route path="/dashboard/documents/:document" component={Document} />

				<Route path="/dashboard/organizations" component={OrganizationsList} exact />
				<Route path="/dashboard/organizations/:organizationId" component={Organization} />

				<Route path="/dashboard/appointments" component={Appointments} />
			</Switch>
		</Router>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(App)
