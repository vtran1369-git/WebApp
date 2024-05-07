import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import ListWO from './components/ListWO'
import NewWorkOrder from './components/NewWorkOrder'
//import NewMFC from './components/NewMFC'
import Nav from './views/Nav'
// import {Grid, Link} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import './Form.css'
import AddCustomer from './components/AddCustomer'
import CDMList from './components/CDMList'
// import NewFC from './components/NewFC'
import NewMFC_Cal from './components/NewMFC_Cal'
import CertForm from './components/Cert_Form'
import EquipList from './components/EquipList'
import useToken from './components/useToken'
import Login from './components/Login'
import Logout from './components/Logout'
import TFList from './components/TFList'


import AuthenService from './api/auth.service'
import SecuredLogin from './components/SecuredLogin'
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button'
import Register from './components/Register'
import TFList_Limit from './components/TFList_Limit'
import CDMListLimit from './components/CDMList-woGetData'

const SecuredLogout = () =>{
  AuthenService.logout()
}

const Error = () => { return <div>Oops! Page not found!</div>}
// const hist = createBrowserHistory()

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

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
    <div className="App" >
      {/* <Router forceRefresh={true}> */}
      {/* <Router history={hist} > */}
      <Router >
      <Grid container item xs={12} direction="row" justify="flex-start">
        <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
          {/* <Nav /> */}
          <div className="Nav_container">
            <h3>MFC Calibration</h3>
            <div className="Nav_left" >
                {/* <Button component={Link} exact to="/login">Login</Button>
                <Button component={Link} exact to="/register">Register</Button> */}
                { currentUser ? (
                  <div>
                   {/*  <Button component={Link} to="/logout">Logout</Button>
                    <Button component={Link} to="/workorder/all">Work Order List</Button>
                    <Button component={Link} to="/workorder/new">New Work Order</Button>
                    <Button component={Link} to="/customer/new">New Customer</Button>
                    <Button component={Link} to="/">CDM List</Button>
                    <Button component={Link} to="/cert/equipment/all">Cal Equipment List</Button>
                    <h3>eTraveler</h3>
                    <Button component={Link} to="/traveler/truflow/all">TruFlow List</Button>
                    <Button component={Link} to="/register">Signup</Button> */}
                    <li className="nav-item">
                      <Link to="/login">Logout</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/workorder/all">Work Order List</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/workorder/new">New Work Order</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/customer/new">New Customer</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/mfccal/all">CDM List</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cert/equipment/all">Cal Equipment List</Link>
                    </li>
                    <h3>eTraveler</h3>
                    {/* <Link to="/traveler/truflow/all">TruFlow List</Link> */}
                    <Link to="/traveler/truflow/limitall">TruFlow List</Link>
                    {/* <Link to="/register">Signup</Link> */}
                  </div>
                  ) : ( 
                  <div>
                    <li className="nav-item">
                      <Link to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register">Signup</Link>
                    </li>
                    {/* <button component={Link} to="/login">Login</button>
                    <button component={Link} to="/register">Signup</button> */}
                   
                  </div>
                  )
                }
            </div>    
        </div>
        </Grid>

        <Grid item xs={10} className="main-display">
          <Switch>
            <Route exact path="/" >
              <Redirect to="/login" />
              {/* {currentUser ? {CDMListLimit} : <Redirect to="/login" />} */}
            </Route>
            <Route component={CDMListLimit} path="/mfccal/all" /> 
            <Route component={ListWO} path="/workorder/all" /> 
            <Route component={NewWorkOrder} path="/workorder/new" />
            <Route component={AddCustomer} path="/customer/new" />
            <Route component={NewMFC_Cal} path="/mfccal/new" />
            <Route component={CertForm} path="/cert/new" />
            <Route component={EquipList} path="/cert/equipment/all" /> 
            <Route component={TFList_Limit} path="/traveler/truflow/limitall" />
            <Route component={SecuredLogout} path="/logout" />
            <Route component={SecuredLogin} path="/login" />
            <Route component={Register} path="/register" />

            <Route component={Error} />
          </Switch>
        </Grid>
      </Grid>
      </Router>
    </div>
  );
}

export default App;

