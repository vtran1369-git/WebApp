import React from 'react'
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
import TFList from './components/TFList'

const Error = () => { return <div>Oops! Page not found!</div>}
// const hist = createBrowserHistory()

const App = () => {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  // const MyLogin = <Login setToken={setToken} />

  return (
    <div className="App" >
      {/* <Router forceRefresh={true}> */}
      {/* <Router history={hist} > */}
      <Router >
      <Grid container item xs={12} direction="row" justify="flex-start">
        <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
          <Nav />
        </Grid>
        <Grid item xs={10} className="main-display">
          <Switch>
            <Route exact component={CDMList} path="/" />
            <Route component={ListWO} path="/workorder/all" /> 
            <Route component={NewWorkOrder} path="/workorder/new" />
            <Route component={AddCustomer} path="/customer/new" />
            <Route component={NewMFC_Cal} path="/mfccal/new" />
            <Route component={CertForm} path="/cert/new" />
            <Route component={EquipList} path="/cert/equipment/all" /> 
            <Route component={TFList} path="/traveler/truflow/all" />
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

