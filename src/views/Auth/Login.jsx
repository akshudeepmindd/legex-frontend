import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Typography, message } from 'antd';

import { AuthLayout } from '../../layouts';
import { LoginForm } from '../../components';
import {
  loginUser,
  googleOAuth,
  facebookOAuth,
} from '../../store/actions/auth';

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email] = useState('');
  const [password] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  const onFinish = async (values) => {
    const response = await dispatch(loginUser(values));
    if (response.success) {
      message.success(response.message);
      history.push('/dashboard/overview');
    } else {
      message.error(response.message);
    }
  };

  const googleLogin = () => {
    dispatch(googleOAuth());
  };

  const facebookLogin = () => {
    dispatch(facebookOAuth());
  };

  return (
    <AuthLayout>
      <Title>Log in</Title>
      <p>
        Don&apos;t have an account?{' '}
        <Link to="/register">Create an account</Link>
      </p>
      <LoginForm
        email={email}
        password={password}
        onFinish={onFinish}
        googleLogin={googleLogin}
        facebookLogin={facebookLogin}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default Login;
