import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';

import { AuthLayout } from '../../layouts';
import { RegisterForm } from '../../components';
import { registerUser } from '../../store/actions/auth';

const { Title } = Typography;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
  }

  onFinish = (values) => {
    this.props.registerUser(values);
  };

  onChangeFirstName = (firstName) => {
    this.setState({
      firstName,
    });
  };

  onChangeLastName = (lastName) => {
    this.setState({
      lastName,
    });
  };

  onChangeEmail = (email) => {
    this.setState({
      email,
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password,
    });
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
    const { loading, error } = this.props;

    return (
      <AuthLayout>
        <p>
          Already have an IBM Cloud account? <Link to="/login">Log in</Link>
        </p>
        <Title>Create an account</Title>
        <Spin spinning={loading} />
        {error ? <Alert>Hey</Alert> : <div />}
        <RegisterForm
          onFinish={this.onFinish}
          onChangeFirstName={this.onChangeFirstName}
          onChangeLastName={this.onChangeLastName}
          onChangeEmail={this.onChangeEmail}
          onChangePhone={this.onChangePhone}
          onChangePassword={this.onChangePassword}
          onChangeConfirmPassword={this.onChangeConfirmPassword}
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          password={password}
          confirmPassword={confirmPassword}
        />
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerUser: (payload) => dispatch(registerUser(payload)),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
