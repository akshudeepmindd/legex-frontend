import React from "react";
import { Redirect } from "react-router-dom";

const Failure = () => {
  return <Redirect to="/login" />;
};
export const WithAuth = (Component) => {
  const user = localStorage.getItem("access-token"); // Handle return user context if authenticated or null if not
  const role = localStorage.getItem("role"); // Handle return user context if authenticated or null if not
  const isAdmin = localStorage.getItem("isAdmin");

  if (user && isAdmin === true) {
    return Component;
  } else if ((user && role == undefined) || role == "User") {
    return Component;
  } else {
    return Failure;
  }
  //console.log();
};
