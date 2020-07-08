import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import { AuthLayout } from '../../layouts';
import { LoginForm } from '../../components';
import { loginUser } from '../../store/actions/auth';

const { Title } = Typography;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  onFinish = (values) => {
    this.props.loginUser(values);
  }

  onEmailChange = email => {
    this.setState({
      email,
    })
  }

  onPasswordChange = password => {
    this.setState({
      password,
    })
  }

  render() {
    return (
      <AuthLayout>
        <Title>Log in to Legex O.D.R.</Title>
        <p>Don't have an account? <Link to="/register">Create an account</Link></p>
        <LoginForm
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
          email={this.state.email}
          password={this.state.password}
          onFinish={this.onFinish}
        />
      </AuthLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: payload => dispatch(loginUser(payload))
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
