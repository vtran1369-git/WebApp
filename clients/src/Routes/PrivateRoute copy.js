import {
    Route,
    Redirect
  } from 'react-router-dom';
  
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
  const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
  export default PrivateRoute;