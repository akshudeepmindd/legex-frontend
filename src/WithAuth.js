import React from 'react';
import { Redirect } from 'react-router-dom'

export const WithAuth = (Component) => {
    return () => {
        // Check if Authenticated
        const user = localStorage.getItem("access-token") // Handle return user context if authenticated or null if not
        
        // If Logged in, it will render the Component.
        if (user) {
            return <Component />;
        } else {
            return <Redirect to="/login" />
        }
    };
};