import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Typography } from "antd";

import { AdminLayout } from "../../layouts";
import { LoginForm } from "../../components";
import {
  loginUser,
  //   googleOAuth,
  //   facebookOAuth,
} from "../../store/actions/admin";

const { Title } = Typography;

const AdminLogin = ({ auth, dispatch }) => {
  const onFinish = (values) => dispatch(loginUser(values));
  console.log(auth);
  return (
    <>
      {!auth ? (
        <AdminLayout>
          <Title>Admin Log in</Title>
          <LoginForm
            onFinish={onFinish}
            // googleLogin={googleLogin}
            // facebookLogin={facebookLogin}
          />
        </AdminLayout>
      ) : (
        <Redirect to="/admin/overview" />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.admin,
});
export default connect(mapStateToProps)(AdminLogin);
