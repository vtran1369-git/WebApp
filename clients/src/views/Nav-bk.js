import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography }  from '@material-ui/core'
import '../Form.css'

export default class Nav extends React.Component {
render() {    
    return (
    // <nav className="Nav">
        <>
        <div className="Nav_container">
            <h3>Menu</h3>
        <div className="Nav__right">
            <ul className="Nav_item-wrapper">
                <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/login">Login</NavLink>
                    </li>
                </Typography>
                <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/workorder/all">Work Order Listing</NavLink>
                    </li>
                </Typography> 
                {/* <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/">Work Order Listing</NavLink>
                    </li>
                </Typography>  */}
                 <Typography variant="button"> 
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/workorder/new">New Work Order</NavLink>
                    </li>
                </Typography> 
               {/*  <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/newmfc">New MFC Registry</NavLink>
                    </li>
                </Typography> */}
                {/* <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/mfc">NEW MFC Registry</NavLink>
                    </li>
                </Typography> */}
                <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/customer/new">New Customer</NavLink>
                    </li>
                </Typography>
               {/*  <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/cdm">CDM LISTING</NavLink>
                    </li>
                </Typography> */}
                <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/">CDM LISTING</NavLink>
                    </li>
                </Typography>
                {/* <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/mfccal/new">New MFC Cal Registry</NavLink>
                    </li>
                </Typography> */}
                {/* <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/cert/new">Print Certification</NavLink>
                    </li>
                </Typography> */}
                <Typography variant="button">
                    <li className="Nav_item">
                        <NavLink className="Nav_link" to="/cert/equipment/all">Calibration Equiptment Listing</NavLink>
                    </li>
                </Typography>
               
            </ul>
        </div>
        </div>
        </>
    // </nav>
    );
}
}

