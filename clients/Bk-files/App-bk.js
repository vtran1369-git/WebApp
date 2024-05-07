import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation } from 'react-router-dom'
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
import SecuredLoginAdmin from './components/SecuredLoginAdmin'
import Register from './components/Register'
import DetailMFC from './components/DetailMFC'
import CertReport from './components/CertReport'
import NavBar from './components/NavBar'
import ListWO_Limit from './components/ListWO_Limit'
import TravelerMFCs from './components/TravelerMFCs'
import Register_Admin from './components/Register_Admin'
import AuthenService_admin from './api/auth.service_admin'
import NavBar_Admin from './components/NavBar_Admin'
import { PrivateRoute } from './views/PrivateRoute'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import SecuredLogout from './components/SecuredLogout'
import constructionImg from './underconstruction.png'

const Error = () => { return <div style={{margin: "50px 50px ", color: "Red"}}><img src={constructionImg} alt="Web Page Under Contruction!"/></div>}
// const hist = createBrowserHistory()
const useStyles = makeStyles({
    root: {
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 0,
      color: 'white',
      height: 30,
      padding: '20px',
      textDecoration: 'none',
      '&:focus': { color:'black',},
      '&:hover': {color: 'red'},
    },
    invisible: { visibility: false}
  })

const App = () => {
    const classes = useStyles()
    const { pathname } = useLocation();  
    const [currentUser, setCurrentUser] = useState({
        id: null,
        username: "",
        email: "",
        role: "",
        accessToken: ""

    });
    // const [currentUser, setCurrentUser] = useState(null);
    /* const SecuredLogout = () =>{
      AuthenService.logout()
    } */
    
    useEffect(() => {
      const user = AuthenService_admin.getCurrentUser()
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
          {/* <NavBar_Admin user={currentUser} /> */}
        <div style={{backgroundColor: "#2c41b7", height: "50px"}} >
            <span style={{fontSize: "40px", color: "yellow", padding: "0px 150px 0px 10px"}}>ThermoFisher</span>
                <Button className= {classes.root} component={Link} to="/login" >Log In</Button>
                <Button className= {classes.root} component={Link} to="/login" onClick={SecuredLogout}>Log Out</Button>
                <Button className= {classes.root} component={Link} to="/contact" >Contact</Button>
                <Button className= {classes.root} component={Link} to="/about" >About</Button>
                <Button className= {classes.root} component={Link} to="/register" >Sign Up</Button>
                {/* <Button className= {role ? classes.root : classes.invisible} to="/Register">Sign Up</Button> */}
                {/* {currentUser.role && <Button className= {classes.root} component={Link} to="/Register">Sign Up</Button> } */}
        </div>
        </Grid>
        <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
          <Nav />
        </Grid>
        <Grid item xs={10} className="main-display">
        {/* <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <PrivateRoute exact path={["/", "/login"]} component={SecuredLogin}/>
            <PrivateRoute exact path="/workorder/new" component={NewWorkOrder} />
            <PrivateRoute exact path="/workorder/all" component={ListWO_Limit}/> 
            <PrivateRoute exact path="/mfccal/all" component={CDMList} />
            <PrivateRoute exact path="/customer/new" component={NewMFC_Cal} />
            <PrivateRoute exact path="/mfccal/new" component={NewMFC_Cal}/>
            <PrivateRoute exact path="/cert/new" component={CertForm} />
            <PrivateRoute exact path="/cert/equipment/all" component={EquipList} /> 
            <PrivateRoute exact path="/traveler/truflow/limitall" component={TFList_Limit}/>
            <PrivateRoute exact path="/traveler/truflow/etraveler" component={ETraveler}  />
            <PrivateRoute exact path="/traveler/truflow/mfclist" component={TravelerMFCs} />
            <PrivateRoute exact path="/register" component={Register_Admin} /> 
            <PrivateRoute exact path="/mfccal/detail" component={DetailMFC} />
            <PrivateRoute exact path="/mfccal/cert" component={CertReport} />
            <PrivateRoute component={Error} />
        </Switch>      */}
        <Switch>
            <Route exact component={SecuredLoginAdmin} path={["/", "/login"]} />
            <Route exact component={CDMList} path="/mfccal/all" />
            <Route component={ListWO_Limit} path="/workorder/all" /> 
            <Route component={NewWorkOrder} path="/workorder/new" />
            <Route component={AddCustomer} path="/customer/new" />
            <Route component={NewMFC_Cal} path="/mfccal/new" />
            <Route component={CertForm} path="/cert/new" />
            <Route component={EquipList} path="/cert/equipment/all" /> 
            <Route component={TFList_Limit} path="/traveler/truflow/limitall" />
            <Route component={ETraveler} path="/traveler/truflow/etraveler" />
            <Route component={TravelerMFCs} path="/traveler/truflow/mfclist" />
            <Route path="/register" component={Register_Admin} /> 
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

