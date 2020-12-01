import React from 'react';
import { Redirect } from 'react-router-dom'

export const WithAuth = (Component) => {
    const user = localStorage.getItem("access-token") // Handle return user context if authenticated or null if not
    if (user) {
        return Component;
    } else {
        return <Redirect to="/login" />
    }
    //console.log();
};