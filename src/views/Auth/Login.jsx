import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Alert, Space } from 'antd';

import { AuthLayout } from '../../layouts';
import { LoginForm } from '../../components';
import {
  loginUser,
  googleOAuth,
  facebookOAuth,
} from '../../store/actions/auth';

const { Title } = Typography;

const Login = ({ login, google, facebook, processing, error }) => {
  const [email] = useState('');
  const [password] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onFinish = (values) => {
    login(values);
  };

  const onFinishFailed = () => {
    setAlert(true);
    setAlertMessage('Validate the forms');
  };

  const googleLogin = () => {
    google();
  };

  const facebookLogin = () => {
    facebook();
  };

  return (
    <AuthLayout>
      <Title>Log in</Title>
      <p>
        Don&apos;t have an account?{' '}
        <Link to="/register">Create an account</Link>
      </p>
      {alert ? (
        <Space direction="vertical">
          <Alert message={alertMessage} type="error" showIcon />
        </Space>
      ) : (
        ''
      )}
      <LoginForm
        email={email}
        password={password}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        googleLogin={googleLogin}
        facebookLogin={facebookLogin}
        processing={processing}
      />
    </AuthLayout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginUser(payload)),
  google: () => dispatch(googleOAuth()),
  facebook: () => dispatch(facebookOAuth()),
});

const mapStateToProps = (state) => ({
  processing: state.auth.loading,
  error: state.auth.error,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  google: PropTypes.func.isRequired,
  facebook: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Object),
};

Login.defaultProps = {
  error: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
