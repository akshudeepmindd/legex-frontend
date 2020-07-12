import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Spin } from 'antd';

import { AuthLayout } from '../../layouts';
import { LoginForm } from '../../components';
import {
  loginUser,
  googleOAuth,
  facebookOAuth,
} from '../../store/actions/auth';

const { Title } = Typography;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onFinish = (values) => {
    const { loginUser } = this.props;
    loginUser(values);
  };

  onEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  onPasswordChange = (password) => {
    this.setState({
      password,
    });
  };

  googleLogin = () => {
    const { googleOAuth } = this.props;
    googleOAuth();
  };

  facebookLogin = () => {
    const { facebookOAuth } = this.props;
    facebookOAuth();
  };

  render() {
    const { email, password } = this.state;
    return (
      <AuthLayout>
        <Title>Log in</Title>
        <p>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
        <Spin />
        <LoginForm
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
          email={email}
          password={password}
          onFinish={this.onFinish}
          googleLogin={this.googleLogin}
          facebookLogin={this.facebookLogin}
        />
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(loginUser(payload)),
  googleOAuth: () => dispatch(googleOAuth()),
  facebookOAuth: () => dispatch(facebookOAuth()),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  googleOAuth: PropTypes.func.isRequired,
  facebookOAuth: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
