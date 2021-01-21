import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './assets/scss/index.sass'
import { fetchOrganizations } from './store/actions/organizations'
import { fetchUser } from './store/actions/user'
import { fetchCaseTypes } from './store/actions/caseTypes'
import { fetchCases } from './store/actions/cases'
import { WithAuth } from './WithAuth'
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
  Contracts,
  Settings,
  SecureContracts
} from './views'
function App({ dispatch, auth }) {
  //all the initial data fetching happens here
  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchUser())
      await dispatch(fetchOrganizations())
      await dispatch(fetchCaseTypes())
      await dispatch(fetchCases())
    }
    if (localStorage.getItem('access-token')) fetchData()
  }, [dispatch, auth])

  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/our-clients' component={Clients} />
        <Route path='/how-we-help-you' component={Help} />
        <Route path='/our-services' component={Services} />
        <Route path='/our-people' component={People} />

        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/contracts' component={Contracts} />

        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ResetPassword} />

        <Route path='/dashboard/overview' component={WithAuth(Overview)} />

        <Route path='/dashboard/cases' component={WithAuth(CasesList)} exact />
        <Route path='/dashboard/cases/:caseId' component={WithAuth(Case)} />

        <Route
          path='/dashboard/documents'
          component={WithAuth(DocumentsList)}
          exact
        />
        <Route
          path='/dashboard/documents/:document'
          component={WithAuth(Document)}
        />

        <Route
          path='/dashboard/organizations'
          component={WithAuth(OrganizationsList)}
          exact
        />
        <Route
          path='/dashboard/organizations/:organizationId'
          component={WithAuth(Organization)}
        />

        <Route
          path='/dashboard/appointments'
          component={WithAuth(Appointments)}
        />
        <Route path='/dashboard/contracts' component={WithAuth(Contracts)} />
        <Route path='/dashboard/securecontracts' component={WithAuth(SecureContracts)} />

        <Route path='/dashboard/settings' component={WithAuth(Settings)} />
        
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(App)
