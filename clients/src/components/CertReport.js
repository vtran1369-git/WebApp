import React, { useState, useEffect, useRef } from 'react'
// import '../Form.css'
import {Grid} from '@material-ui/core'
import Report_Form from './Report_Form'
import Cert_Form from './Cert_Form'
import { useLocation } from 'react-router-dom'

export default function App(props) {
    
    /* const data =props.certreport.certdata
    const id = props.certreport.id
    const reportData = props.certreport.reportdata */
    const location = useLocation()
    // console.log("CertReport: location.state: ", location.state)
    const data = location.state.certdata
    const id = location.state.id
    const reportData = location.state.reportdata
    console.log(">>CertReport_Form, props.id: ", id)
    console.log(">>CertRerpot_Form, props.vlaue: ", data)

    return (
        <>
            <Grid container xs="10" className="form-main" spacing={0} direction="row" justify="left" alignItems="stretch">
                {/* Component "Cert_Form" */}
                <Grid item xs={5} className="form-control" id="cert-form">
                    <Cert_Form id={id} value={data} />
                </Grid>
                {/* display REPORT FORM  */}
                <Grid item xs={5} className="form-control report" justify-self="left" >
                    <Report_Form value = {data} reportData = {reportData} />
                </Grid>
            </Grid>
        </>
    )
}

