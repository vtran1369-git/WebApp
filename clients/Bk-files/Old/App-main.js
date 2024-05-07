import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './Form.css'

import AuthenService from './api/auth.service'
import SecuredLogin from './components/SecuredLogin'
// import "bootstrap/dist/css/bootstrap.min.css";

import Register from './components/Register'
import Dashboard from './Dashboard'

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
 
  const SecuredLogout = () =>{
    AuthenService.logout()
  }
  
  useEffect(() => {
    const user = AuthenService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])
 /*  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  */

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Thermo Fisher
        </Link>
        <div className="navbar-nav mr-auto">
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={SecuredLogout}>
                  Log Out
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
            </li>
            </div>  
          ) : (
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
          )
          }
        </div>
      </nav>
      
      <div className="conainter mt-3">
        <Switch>
          <Route exact path={["/","/login"]} component={SecuredLogin} />
          {/* <Route path="/login" component={SecuredLogin} /> */}
          <Route path="/home" component={Dashboard} />
          {/* <Route path="/logout" component={SecuredLogout} /> */}
          <Route path="/register" component={Register} />
        </Switch>
      </div>

    </div>
  );
}

export default App;

