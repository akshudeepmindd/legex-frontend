import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Spin } from 'antd';

import { AuthLayout } from '../../layouts';
import { LoginForm } from '../../components';
import { loginUser, googleOAuth, facebookOAuth } from '../../store/actions/auth';

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

  googleLogin = () => {
    this.props.googleOAuth();
  }

  facebookLogin = () => {
    this.props.facebookOAuth();
  }

  render() {
    return (
      <AuthLayout>
        <Title>Log in</Title>
        <p>Don't have an account? <Link to="/register">Create an account</Link></p>
        <Spin/>
        <LoginForm
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
          email={this.state.email}
          password={this.state.password}
          onFinish={this.onFinish}
          googleLogin={this.googleLogin}
          facebookLogin={this.facebookLogin}
        />
      </AuthLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: payload => dispatch(loginUser(payload)),
  googleOAuth: () => (dispatch(googleOAuth())),
  facebookOAuth: () => (dispatch(facebookOAuth())),
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
