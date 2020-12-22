import React from 'react';
import { Redirect } from 'react-router-dom'

const Failure = () =>{
    return <Redirect to="/login" />
}
export const WithAuth = (Component) => {
    const user = localStorage.getItem("access-token") // Handle return user context if authenticated or null if not
    if (user) {
        return Component;
    } else {
        return Failure; 
    }
    //console.log();
};