import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ListWO from './components/ListWO'
import NewWorkOrder from './components/NewWorkOrder'
//import NewMFC from './components/NewMFC'
import Nav from './views/Nav'
import {Grid} from '@material-ui/core'
// import './App.css'
import './Form.css'
import AddCustomer from './components/AddCustomer'
import CDMList from './components/CDMList'
// import NewFC from './components/NewFC'
import NewMFC_Cal from './components/NewMFC_Cal'
import CertForm from './components/Cert_Form'
import EquipList from './components/EquipList'
import { createBrowserHistory } from 'history'

import useToken from './components/useToken'
import Login from './components/Login'
import Logout from './components/Logout'

import AuthService from './api/auth.service'
import SecuredLogin from './components/SecuredLogin'
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/Register'
import Button from '@material-ui/core/Button'

const Error = () => { return <div>Oops! Page not found!</div>}
const hist = createBrowserHistory()

const App = () => {
  // const [ token, setToken ] = useToken();
  const [ currentUser, setCurrentUser ] = useState(undefined)

 /*  if(!token) {
    return <Login setToken={setToken} />
  }
 */

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    console.log("currentUser: ", user)
    if(user){
      setCurrentUser(user)
    }
   
  },[])

  const logOut = () => {
    AuthService.logout();
  };
  
  return (
    <div className="App" >
      {/* <Router forceRefresh={true}> */}
      {/* <Router history={hist} > */}
      <Router >
      <Grid container xs={12} spacing="3" direction="row" justify="flex-start">
        <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
          {/* <Nav /> */}
          <div className="Nav_container">
            <h3>Menu</h3>
            <div className="Nav_left" >
              { !currentUser ? (
                <>
                  <Button component={Link} exact to="/login">Login</Button>
                  <Button component={Link} exact to="/register">Register</Button>
                </>
              ):(
                <>
                  {/* <Button component={Link} to="/logout">Logout</Button> */}
                  <Button component={Link} to="/workorder/all">Work Order List</Button>
                  <Button component={Link} to="/workorder/new">New Work Order</Button>
                  <Button component={Link} to="/customer/new">New Customer</Button>
                  <Button component={Link} to="/">CDM List</Button>
                  {/* <Button component={Link} to="/mfccal/all">CDM List</Button> */}
                  <Button component={Link} to="/cert/equipment/all">Cal Equipment List</Button>
                </>
              )
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={10} className="main-display">
            <Switch>
              <Route component={SecuredLogin} exact path="/login" />
              <Route component={Register} exact path="/register" />
              {/* <Route exactly component = {< Login setToken={setToken} />} pattern="/" /> */}
              {/* <Route exact component={MyLogin} path="/" /> */}
              {/* <Route component={CDMList} path="/mfccal/all" /> */}
              <Route exact component={CDMList} path="/" />
              //TODO*** NEED TO validate the line below by RUN SERVER TO SEE IF it is working
              {/* <Route exact path="/" render={(props) => <CDMList {...props} key={window.location.key} />} /> */}
              
              <Route component={ListWO} path="/workorder/all" /> 
              {/* <Route exact component={ListWO} path="/" /> */}
              <Route component={NewWorkOrder} path="/workorder/new" />
              {/* <Route exact component={NewFC} path="/mfc" /> */}
              {/* <Route exact component={NewMFC} path="/newmfc" /> */}
              <Route component={AddCustomer} path="/customer/new" />
              {/* <Route exact component={CDMList} path="/mfccal/all" /> */}
              {/* <Route exact component={NewMFC_Cal} path="/mfccal" /> */}
              <Route component={NewMFC_Cal} path="/mfccal/new" />
              <Route component={CertForm} path="/cert/new" />
              <Route component={EquipList} path="/cert/equipment/all" /> 
              <Route component={Logout} path="/logout" />
              <Route component={Error} />
            </Switch>
        </Grid>
      </Grid>
      </Router>
    </div>
  );
}

export default App;

