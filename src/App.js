import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Home,
  Help,
  ClientsList,
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
  Activity,
} from './views';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/how-we-help-you" component={Help} />
        <Route path="/our-clients" component={ClientsList} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route path="/dashboard/overview" component={Overview} />

        <Route path="/dashboard/cases" component={CasesList} exact />
        <Route path="/dashboard/cases/:case" component={Case} />

        <Route path="/dashboard/documents" component={DocumentsList} exact />
        <Route path="/dashboard/documents/:document" component={Document} />

        <Route
          path="/dashboard/organizations"
          component={OrganizationsList}
          exact
        />
        <Route
          path="/dashboard/organizations/:organization"
          component={Organization}
        />

        <Route path="/dashboard/activities" component={Activity} />
      </Switch>
    </Router>
  );
}

export default App;
