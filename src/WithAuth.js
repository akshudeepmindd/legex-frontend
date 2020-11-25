import React from 'react';
import {Login} from './views'

export const WithAuth = (Component) => {
    return () => {
        // Check if Authenticated
        const user = localStorage.getItem('token') // Handle return user context if authenticated or null if not

        // If Logged in, it will render the Component.
        if (user) {
            return <Component />;
        } else {
            return <Login/>
        }
    };
};