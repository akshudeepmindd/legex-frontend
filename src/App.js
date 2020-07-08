import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Home,
  Login, Register, ForgotPassword, ResetPassword,
  Overview,
  OrganizationsList, Organization
} from './views';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>

        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/reset-password" component={ResetPassword}/>

        <Route path="/overview" component={Overview}/>

        <Route path="/organizations" component={OrganizationsList}/>
        <Route path="/organization" component={Organization}/>

      </Switch>
    </Router>
  );
}

export default App;
