import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import { useLocation, useNavigate } from 'react-router-dom'
import PrintPage from './PrintPage'
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';

export default function App() {
    const divPrint = useRef(null)
    const location = useLocation()
    const detailWO = location.state.wo_data
    const pickList = location.state.picklist
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("Workorder RUNNING ..EFFECT")
        console.log("Property data: ", pickList)
        
    }, [])

    return (
        <div ref={divPrint} className="form-container agitator">
            <style type="text/css" media="print">
                    {" @page { size: landscape; } "}
            </style>
            <div>
                <Header name="Detail Work Order" />
                <ul>
                    {Object.entries(detailWO).map(([key, value], i) =>(
                        <li>{value}</li>
                    ))}
                </ul>
                <h2 style={{textAlign: "center"}}>Component List</h2>
                <ul>
                    {Object.entries(pickList).map(([key, value], i) =>(
                        <li>{value}</li>
                    ))}
                </ul>
            </div>
            <Grid container xs={12} spacing={2} direction="row" className="foot-bttn" style={{marginLeft: "15px", marginBottom: "0px"}} >
                <Grid item xs={1}>
                    <PrintPage pageName="PRINT" divRef = {divPrint} />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outline-info" onClick={()=> navigate(-1)}>Go Back</Button>
                </Grid>
            </Grid>
           
            
        </div>
    )
}
