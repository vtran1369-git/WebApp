import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
import useToken from './components/useToken'
import Login from './components/Login'
import Logout from './components/Logout'
import TFList_Limit from './components/TFList_Limit'
import CDMListLimit from './components/CDMList-woGetData'
import AuthenService from './api/auth.service'
import SecuredLogin from './components/SecuredLogin'
import Register from './components/Register'
import DetailMFC from './components/DetailMFC'
import CertReport from './components/CertReport'

const Error = () => { return <div>Oops! Page not found!</div>}
// const hist = createBrowserHistory()

const App = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
 
    /* const SecuredLogout = () =>{
      AuthenService.logout()
    } */
    
    useEffect(() => {
      const user = AuthenService.getCurrentUser()
      if (user) {
        setCurrentUser(user)
      }
    }, [])

  return (
    <div className="App" >
      <Router >
      <Grid container item xs={12} direction="row" justify="flex-start">
        <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
          <Nav />
        </Grid>
        <Grid item xs={10} className="main-display">
          <Switch>
            {/* <Route exact component={CDMList} path="/" /> */}
            {/* <Route exact component={CDMListLimit} path="/" /> */}
            <Route exact component={SecuredLogin} path={["/", "/login"]} />
            <Route exact component={CDMListLimit} path="/mfccal/all" />
            <Route component={ListWO} path="/workorder/all" /> 
            <Route component={NewWorkOrder} path="/workorder/new" />
            <Route component={AddCustomer} path="/customer/new" />
            <Route component={NewMFC_Cal} path="/mfccal/new" />
            <Route component={CertForm} path="/cert/new" />
            <Route component={EquipList} path="/cert/equipment/all" /> 
            {/* <Route component={TFList} path="/traveler/truflow/all" /> */}
            <Route component={TFList_Limit} path="/traveler/truflow/limitall" />
            {/* <Route component={SecuredLogout} path="/logout" /> */}
            <Route path="/register" component={Register} />
            <Route path="/mfccal/detail" component={DetailMFC} />
            <Route path="/mfccal/cert" component={CertReport} />
            <Route component={Error} />
          </Switch>
        </Grid>
      </Grid>
      </Router>
    </div>
  );
}

export default App;

