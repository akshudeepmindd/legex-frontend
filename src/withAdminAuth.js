import React from "react";
import { Redirect } from "react-router-dom";
// import jwtdecode from "jwt-decode";

const Failure = () => {
  return <Redirect to="/admin" />;
};
export const withAdminAuth = (Component) => {
  const user = localStorage.getItem("access-token"); // Handle return user context if authenticated or null if not
  // const decodedToken = jwtdecode(user);
  const isAdmin = localStorage.getItem("isAdmin");
  if (user && isAdmin == "true") {
    return Component;
  } else {
    return Failure;
  }
  //console.log();
};
