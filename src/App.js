import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/scss/index.sass";
import { fetchOrganizations } from "./store/actions/organizations";
import { fetchUserList } from "./store/actions/adminUsers";
import { fetchUser } from "./store/actions/user";
import { fetchCaseTypes } from "./store/actions/caseTypes";
import { fetchCases } from "./store/actions/cases";
import {
  fetchCasesAdmin,
  fetchAllOrganisations,
} from "./store/actions/adminAction";
import { WithAuth } from "./WithAuth";
import { withAdminAuth } from "./withAdminAuth";
import { WithMediatorAuth } from "./withMediatorAuth";
import CaseForm from "./views/Dashboard/Cases/CaseForm";
import AdminHome from "./views/AdminDashboard/AdminHome";
import ManageNeutral from "./views/AdminDashboard/ManageNeutral";
import AdminSettings from "./views/AdminDashboard/AdminSettings";
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
  SecureContracts,
  AdminLogin,
  MediatorOverview,
  MediatorCases,
  MediatorCase,
  MediatorSettings,
  AdminOrganizationsList,
  AdminOrganization,
  AdminCase,
  AdminDocumentsList,
  AdminContracts,
} from "./views";

function App({ dispatch, auth }) {
  //all the initial data fetching happens here
  useEffect(() => {
    function apicalls() {
      if (
        localStorage.getItem("access-token") &&
        localStorage.getItem("isAdmin") == "true"
      ) {
        async function fetchDataAdmin() {
          await dispatch(fetchCasesAdmin());
          await dispatch(fetchAllOrganisations());
          await dispatch(fetchUserList());
        }
        fetchDataAdmin();
      } else if (
        localStorage.getItem("access-token") &&
        localStorage.getItem("role")
      ) {
        async function fetchData() {
          await dispatch(fetchUser());
          await dispatch(fetchOrganizations());
          await dispatch(fetchCaseTypes());
          await dispatch(fetchCases());
        }
        fetchData();
      }
    }
    apicalls();
  }, [dispatch, auth]);

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
        <Route path="/contracts" component={Contracts} />

        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route path="/dashboard/overview" component={WithAuth(Overview)} />

        <Route path="/dashboard/cases" component={WithAuth(CasesList)} exact />
        <Route path="/dashboard/cases/:caseId" component={WithAuth(Case)} />
        {/* <Route path='/dashboard/caseForm' component={WithAuth(CaseForm)} /> */}
        <Route path="/dashboard/caseForm" component={WithAuth(CaseForm)} />

        <Route
          path="/dashboard/documents"
          component={WithAuth(DocumentsList)}
          exact
        />
        <Route
          path="/dashboard/documents/:document"
          component={WithAuth(Document)}
        />

        <Route
          path="/dashboard/organizations"
          // case AUTH_FAILURE:
          // case LOGOUT_USER:
          //   return initialState
          component={WithAuth(OrganizationsList)}
          exact
        />
        <Route
          path="/dashboard/organizations/:organizationId"
          component={WithAuth(Organization)}
        />

        <Route
          path="/dashboard/appointments"
          component={WithAuth(Appointments)}
        />
        <Route path="/dashboard/contracts" component={WithAuth(Contracts)} />
        <Route
          path="/dashboard/securecontracts"
          component={WithAuth(SecureContracts)}
        />

        <Route path="/dashboard/settings" component={WithAuth(Settings)} />
        <Route path="/admin" exact component={AdminLogin} />
        <Route path="/admin/overview" exact component={WithAuth(AdminHome)} />
        <Route
          path="/admin/manageNeutral"
          exact
          component={WithAuth(ManageNeutral)}
        />
        <Route
          path="/admin/settings"
          exact
          component={WithAuth(AdminSettings)}
        />
        <Route
          path="/admin/organizations"
          exact
          component={WithAuth(AdminOrganizationsList)}
        />
        <Route
          path="/admin/organizations/:organizationId"
          component={WithAuth(AdminOrganization)}
        />
        <Route
          path="/admin/cases/:caseId"
          component={WithAuth(AdminCase)}
          exact
        />
        <Route
          path="/admin/documents"
          component={WithAuth(AdminDocumentsList)}
          exact
        />
        <Route
          path="/admin/securecontracts"
          component={WithAuth(AdminContracts)}
        />
        <Route
          path="/mediator/overview"
          component={WithMediatorAuth(MediatorOverview)}
        />
        <Route
          path="/mediator/cases"
          component={WithMediatorAuth(MediatorCases)}
          exact
        />
        <Route
          path="/mediator/cases/:caseId"
          component={WithMediatorAuth(MediatorCase)}
          exact
        />
        <Route
          path="/mediator/settings"
          component={WithMediatorAuth(MediatorSettings)}
          exact
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
