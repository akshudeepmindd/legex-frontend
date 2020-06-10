import React, { Component } from 'react';

import { AuthLayout } from '../../layouts';

class Login extends Component
{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <AuthLayout></AuthLayout>
    )
  }
}

export default Login;
