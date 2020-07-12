import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { connect } from 'react-redux';

import { AuthLayout } from '../../layouts';
import { ForgotPasswordForm } from '../../components';
import { forgotPassword } from '../../store/actions/auth';

const { Title } = Typography;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onFinish = (values) => {
    const { forgotPassword } = this.props;
    forgotPassword(values);
  };

  onEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  render() {
    const { email } = this.state;

    return (
      <AuthLayout>
        <Title>Having trouble logging in?</Title>
        <p>Enter your IBMid to reset your password.</p>
        <ForgotPasswordForm
          email={email}
          onEmailChange={this.onEmailChange}
          onFinish={this.onFinish}
        />
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (payload) => dispatch(forgotPassword(payload)),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

ForgotPassword.defaultProps = {};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
