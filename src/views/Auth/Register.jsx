import React from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import { Link, Redirect } from "react-router-dom";

import { AuthLayout } from "../../layouts";
import { RegisterForm } from "../../components";
import {
  registerUser,
  googleOAuth,
  facebookOAuth,
} from "../../store/actions/auth";

const { Title } = Typography;

const Register = ({ auth, dispatch }) => {
  const onFinish = async (values) => await dispatch(registerUser(values));
  const googleLogin = () => {
    dispatch(googleOAuth());
  };

  const facebookLogin = () => {
    dispatch(facebookOAuth());
  };

  return (
    <>
      {!auth ? (
        <AuthLayout>
          <p>
            Already have a Legex O.D.R. account? <Link to="/login">Log in</Link>
          </p>
          <Title>Create an account</Title>
          <RegisterForm
            onFinish={onFinish}
            googleLogin={googleLogin}
            facebookLogin={facebookLogin}
          />
        </AuthLayout>
      ) : (
        <Redirect to="/dashboard/overview" />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Register);
