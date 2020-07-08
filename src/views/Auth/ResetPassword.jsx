import React, { Component } from 'react';
import { Typography } from 'antd';
import { connect } from 'react-redux';

import { AuthLayout } from '../../layouts';
import { ResetPasswordForm } from '../../components';
import { resetPassword } from '../../store/actions/auth';

const { Title } = Typography;

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    }
  }

  onFinish = (values) => {
    this.props.resetPassword(values);
  }

  onPasswordChange = (password) => {
    this.setState({
      password: password
    })
  }

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({
      confirmPassword: confirmPassword
    })
  }

  render() {
    return (
      <AuthLayout>
        <Title>Reset Password</Title>
        <ResetPasswordForm
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          onPasswordChange={this.onPasswordChange}
          onConfirmPasswordChange={this.onConfirmPasswordChange}
          onFinish={this.onFinish}
        />
      </AuthLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetPassword: payload => dispatch(resetPassword(payload))
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
