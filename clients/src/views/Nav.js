import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default class Nav extends React.Component {
    render() {    
        return (
            <>
            <div className="Nav_container">
                <h3 className="menu-headline">TruFlow </h3>
                <div className="Nav_left" >
                    <Link to="/traveler/truflow/limitall">TruFlow List</Link>
                </div>
                <div className="Nav_left" >
                    <Link to="/truflow/config">Configurator</Link>
                </div>
                <h3 className="menu-headline">MFC Calibration</h3>
                <div className="Nav_left" >
                    <Link to="/mfccal/all">CDM List</Link>
                </div>
                <div className="Nav_left" >
                    <Link to="/cert/equipment/all">Cal Equipment List</Link>
                </div>
                <h3 className="menu-headline">Work Order</h3>
                <div className="Nav_left" >
                    <Link to="/workorder/all">All</Link>
                   {/*  <Link to="/workorder/new">New Work Order</Link>
                    <Link to="/customer/new">New Customer</Link> */}
                </div>
                <h3 className="menu-headline">Agitator</h3>
                <div className="Nav_left" >
                    <Link to="/traveler/agitator/all">All eTravelers</Link>
                </div>
                <div className="Nav_left" >
                    <Link to="/traveler/agitator/new" >Create New</Link>
                </div>
                <h3 className="menu-headline">eSHIPPING</h3>
                <div className="Nav_left" >
                    <Link to="/shipping/all">Shipping List</Link>
                </div>
                <div className="Nav_left" >
                    <Link to="/shipping/new">New Shipment</Link>
                </div>
            </div>
            </>
        );
    }
}

