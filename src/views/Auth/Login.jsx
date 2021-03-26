import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Typography } from "antd";

import { AuthLayout } from "../../layouts";
import { LoginForm } from "../../components";
import {
  loginUser,
  googleOAuth,
  facebookOAuth,
} from "../../store/actions/auth";

const { Title } = Typography;

const Login = ({ auth, dispatch }) => {
  const onFinish = (values) => dispatch(loginUser(values));

  const googleLogin = () => {
    dispatch(googleOAuth());
  };

  const facebookLogin = () => {
    dispatch(facebookOAuth());
  };
  console.log(auth, "authhh");
  return (
    <>
      {!auth ? (
        <AuthLayout>
          <Title>Log in</Title>
          <p>
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
          <LoginForm
            onFinish={onFinish}
            googleLogin={googleLogin}
            facebookLogin={facebookLogin}
          />
        </AuthLayout>
      ) : (
        <Redirect
          to={
            localStorage.getItem("isAdmin") === 'true'
              ? "/admin/overview"
              : localStorage.getItem("role") == "Mediator"
              ? "/mediator/overview"
              : "/dashboard/overview"
          }
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Login);
