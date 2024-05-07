import { lazy, Suspense, Fragment } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet
} from 'react-router-dom';

import Loader from './Utils/Loader';
import ProtectedRoutes from './Routes/ProtectedRoutes'; //Authenticated routes
import PublicRoute from './Routes/PublicRoute'; 
import PrivateRoute from './Routes/PrivateRoute'; 
import AuthenService_admin from './api/auth.service_admin'
import Nav from './views/Nav'
import {Grid} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import SecuredLogout from './components/SecuredLogout'
import NewLoginPage from './components/SecuredLoginNew'
import Register from './components/Register_Admin'
import NoFoundComponent from './components/NoFoundComponent'
import Contact from './components/Contact'
import MFCList from './components/CDMList'
import WOList from './components/WOList'
import EquipList from './components/EquipList'
import TFList from './components/TFList'
import MFCDetail from './components/DetailMFC'
import CertReport from './components/CertReport'
import NewAgitator from './components/NewAgitator'
import AgitatorList from './components/AgitatorList'
import Agitator from './components/Agitator'
import WorkOrder from './components/WorkOrder'

// const NewLoginPage = lazy(() => import('./components/SecuredLoginNew'));
// const SecuredLogout = lazy(() => import('./components/SecuredLogout'))
// const Register = lazy(() => import('./components/Register_Admin'));
// const ForgotPassword = lazy(() => import('components/ForgotPassword'));
/* const NoFoundComponent = lazy(() => import('./components/NoFoundComponent'))
const Contact = lazy(() => import('./components/Contact')); */

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
    //const isAuthenticated = getToken();
    // const isAuthenticated = AuthenService_admin.getCurrentUser()
    return (
        <div className="App">
            {/* <BrowserRouter> */}
                <Grid container item xs={12} direction="row" justify="flex-start">
                    <Grid item xs={12}>
                        <div style={{backgroundColor: "#2c41b7", height: "50px"}} >
                            <span style={{fontSize: "40px", color: "yellow", padding: "0px 150px 0px 10px"}}>ThermoFisher</span>
                            <Link className= {classes.root} to="/login" >Log In</Link>
                            <Link className= {classes.root} to="/login" onClick={SecuredLogout}>Log Out</Link>
                            <Link className= {classes.root} to="/contact" >Contact</Link>
                            <Link className= {classes.root} to="/about" >About</Link>
                            <Link className= {classes.root} to="/register" >Register</Link>
                        </div>
                    </Grid>
                    <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
                        <Nav />
                    </Grid>
                    <Grid item xs={10} className="main-display">
                        {/* <Suspense fallback={<Loader />}> */}
                            <Routes>
                               {/*  <Route
                                    path="/" element={<NewLoginPage />}
                                    //isAuthenticated={isAuthenticated}
                                >
                                </Route> */}
                                <Route
                                    path="/login" element={<NewLoginPage />}
                                    //isAuthenticated={isAuthenticated}
                                >
                                </Route>
                                <Route
                                    path="/register" element={<Register />}
                                >
                                </Route>
                                <Route
                                    path="/contact" element={<Contact />}
                                >
                                </Route>
                                {/*  <PublicRoute
                                    path="/forgot-password"
                                    isAuthenticated={isAuthenticated}
                                >
                                    <ForgotPassword />
                                </PublicRoute> */}
                                {/* <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <Grid className="app-nav" item xs={2} style={{maxWidth: "200px"}}>
                                                <Nav />
                                            </Grid>
                                            
                                        </PrivateRoute>
                                    }
                                >
                                </Route> */}
                                <Route
                                    path="/mfccal/all"
                                    element={
                                        <PrivateRoute>
                                            <MFCList />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/workorder/all"
                                    element={
                                        <PrivateRoute>
                                            <WOList />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/cert/equipment/all"
                                    element={
                                        <PrivateRoute>
                                            <EquipList />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/traveler/truflow/limitall"
                                    element={
                                        <PrivateRoute>
                                            <TFList />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/mfccal/detail"
                                    element={
                                        <PrivateRoute>
                                            <MFCDetail />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/mfccal/cert"
                                    element={
                                        <PrivateRoute>
                                            <CertReport />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/traveler/agitator/new"
                                    element={
                                        <PrivateRoute>
                                            <NewAgitator />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/traveler/agitator/all"
                                    element={
                                        <PrivateRoute>
                                            <AgitatorList />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/traveler/agitator/editview"
                                    element={
                                        <PrivateRoute>
                                            <Agitator />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                <Route
                                    path="/workorder/detail"
                                    element={
                                        <PrivateRoute>
                                            <WorkOrder />
                                        </PrivateRoute>
                                    }
                                >
                                </Route>
                                
                        
                            </Routes>
                        {/* </Suspense> */}
                    </Grid>
                </Grid>
            {/* </BrowserRouter> */}
        </div>
    );
};

export default App;