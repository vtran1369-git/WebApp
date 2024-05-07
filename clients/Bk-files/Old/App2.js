import React, { useEffect, useState } from 'react'
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
import TFList_Limit from './components/TFList_Limit'
import TFList from './components/TFList'
import ETraveler_Form from './components/ETraveler_Form'
import ETraveler from './components/ETraveler'
import AuthenService from './api/auth.service'
import SecuredLogin from './components/SecuredLogin'
import Register from './components/Register'
import DetailMFC from './components/DetailMFC'
import CertReport from './components/CertReport'
import NavBar from './components/NavBar'
import ListWO_Limit from './components/ListWO_Limit'
import TravelerMFCs from './components/TravelerMFCs'
import Register_Admin from './components/Register_Admin'

const Error = () => { return <div>Oops! Page not found!</div>}
// const hist = createBrowserHistory()

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    /* const SecuredLogout = () =>{
      AuthenService.logout()
    } */
    
    useEffect(() => {
      const user = AuthenService.getCurrentUser()
      console.log(`USER is `, user)
      if (user) {
        setCurrentUser(user)
      }
    }, [])

  return (
    <div className="App" >
      <Router >
      <Grid container item xs={12} direction="row" justify="flex-start">
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
          <Nav />
        </Grid>
        <Grid item xs={10} className="main-display">
          <Switch>
            <Route exact component={SecuredLogin} path={["/", "/login"]} />
            {/* <Route exact component={CDMListLimit} path="/mfccal/all" /> */}
            <Route exact component={CDMList} path="/mfccal/all" />
            <Route component={ListWO_Limit} path="/workorder/all" /> 
            {/* <Route component={ListWO} path="/workorder/all" />  */}
            <Route component={NewWorkOrder} path="/workorder/new" />
            <Route component={AddCustomer} path="/customer/new" />
            <Route component={NewMFC_Cal} path="/mfccal/new" />
            <Route component={CertForm} path="/cert/new" />
            <Route component={EquipList} path="/cert/equipment/all" /> 
            {/* <Route component={TFList} path="/traveler/truflow/limitall" /> */}
            <Route component={TFList_Limit} path="/traveler/truflow/limitall" />
            <Route component={ETraveler} path="/traveler/truflow/etraveler" />
            <Route component={TravelerMFCs} path="/traveler/truflow/mfclist" />
            {/* <Route component={SecuredLogout} path="/logout" /> */}
            {/* <Route path="/register" component={Register} /> */}
            <Route path="/register" component={Register_Admin} /> 
            <Route path="/mfccal/detail" component={DetailMFC} />
            <Route path="/mfccal/cert" component={CertReport} />

            {/* <Route exact component={SecuredLogout} path={"/logout"} /> */}
            <Route component={Error} />
          </Switch>
        </Grid>
      </Grid>
      </Router>
    </div>
  );
}

export default App;

