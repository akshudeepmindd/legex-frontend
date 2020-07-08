import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import { AuthLayout } from '../../layouts';
import { RegisterForm } from '../../components';
import { registerUser } from '../../store/actions/auth';
const {Title} = Typography;

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
    }
  }

  onFinish = (value) => {

  }

  onChangeFirstName = (firstName) => {
    this.setState({
      firstName: firstName,
    })
  }

  onChangeLastName = (lastName) => {
    this.setState({
      lastName: lastName,
    })
  }

  onChangeEmail = (email) => {
    this.setState({
      email: email
    })
  }

  onChangePassword = (password) => {
    this.setState({
      password: password
    })
  }

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword: confirmPassword
    })
  }

  render() {
    return (
      <AuthLayout>
        <p>Already have an IBM Cloud account? <Link to="/login">Log in</Link></p>
        <Title>Create an account</Title>
        <RegisterForm
          onFinish={this.onFinish}
          onChangeFirstName={this.onChangeFirstName}
          onChangeLastName={this.onChangeLastName}
          onChangeEmail={this.onChangeEmail}
          onChangePhone={this.onChangePhone}
          onChangePassword={this.onChangePassword}
          onChangeConfirmPassword={this.onChangeConfirmPassword}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
          phone={this.state.phone}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
        />
      </AuthLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerUser: payload => dispatch(registerUser(payload))
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
