import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenService_admin from '../api/auth.service_admin'

function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            const user = AuthenService_admin.getCurrentUser()
            if (!user) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                // return <Redirect to={{ pathname: '/login' }} />
            }

            // check if route is restricted by role
           /*  if (roles && roles.indexOf(user.role) === -1) {
                // role not authorized so redirect to home page
                return <Redirect to={{ pathname: '/'}} />
            } */

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };