import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  /* function PublicRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            !isAuthenticated ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location }
                }}
              />
            ))
        }
      />
    );
  } */
  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
  );
  
  export default PublicRoute;