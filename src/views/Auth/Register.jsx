import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import { AuthLayout } from '../../layouts';
import { RegisterForm } from '../../components';
import {
  registerUser,
  googleOAuth,
  facebookOAuth,
} from '../../store/actions/auth';

const { Title } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.auth.loading);

  const [firstName] = useState('');
  const [lastName] = useState('');
  const [email] = useState('');
  const [phone] = useState('');
  const [password] = useState('');
  const [confirmPassword] = useState('');

  const onFinish = async (values) => {
    const response = await dispatch(registerUser(values));
    message.success(response.message);
    history.push('/login');
  };

  const handleChange = () => {};

  const googleLogin = () => {
    dispatch(googleOAuth());
  };

  const facebookLogin = () => {
    dispatch(facebookOAuth());
  };

  return (
    <AuthLayout>
      <p>
        Already have a Legex O.D.R. account? <Link to="/login">Log in</Link>
      </p>
      <Title>Create an account</Title>
      <RegisterForm
        onFinish={onFinish}
        googleLogin={googleLogin}
        facebookLogin={facebookLogin}
        handleChange={handleChange}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        password={password}
        confirmPassword={confirmPassword}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default Register;
