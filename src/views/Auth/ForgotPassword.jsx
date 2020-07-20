import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { connect } from 'react-redux';

import { AuthLayout } from '../../layouts';
import { ForgotPasswordForm } from '../../components';
import { forgotPassword } from '../../store/actions/auth';

const { Title } = Typography;

function ForgotPassword({ forgot }) {
  const [email, setEmail] = useState('');

  function onFinish(values) {
    forgot(values);
  }
  return (
    <AuthLayout>
      <Title>Having trouble logging in?</Title>
      <p>Enter your IBMid to reset your password.</p>
      <ForgotPasswordForm email={email} onFinish={onFinish} />
    </AuthLayout>
  );
}

const mapDispatchToProps = (dispatch) => ({
  forgot: (payload) => dispatch(forgotPassword(payload)),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

ForgotPassword.defaultProps = {};

ForgotPassword.propTypes = {
  forgot: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
