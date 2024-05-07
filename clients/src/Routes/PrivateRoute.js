
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenService_admin from "../api/auth.service_admin"

  /* function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            isAuthenticated
              ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  } */
  // function PrivateRoute ({ children, isAuthenticated }) {
  function PrivateRoute ({ children }) {
    const isAuthenticated = AuthenService_admin.getCurrentUser()
    return isAuthenticated ? <>{children}</> : <useNavigate to="/login" />
  };

  export default PrivateRoute;