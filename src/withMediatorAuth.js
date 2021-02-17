import React from 'react'
import { Redirect } from 'react-router-dom'

const Failure = () => {
  return <Redirect to='/login' />
}
export const WithMediatorAuth = (Component) => {
  const user = localStorage.getItem('access-token') // Handle return user context if authenticated or null if not
  const role = localStorage.getItem('role')
  if (user && role == 'Mediator') {
    return Component
  } else {
    return Failure
  }
  //console.log();
}
