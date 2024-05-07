import React, { useState, useEffect, useRef } from "react";
import Table_CDMList_Limit2 from './Table_CDMList_Limit2'
import Header from "./Header";
import {Grid} from '@material-ui/core'
/* import Chance from "chance";
import MFC_Cal_Form from './MFC_CAL_Form'
import MfcCalService from "../api/MfcCalService"
import CertReport_Form from './CertReport_Form'
 */



function App() {
 /*  const [cdm, setCDM] = useState({ cdm_data: [], cdm_columns: [] })
  const [mfccalObj, setMfccalObj] = useState({ mfccal_data: [], cal_id: null })
  const [certreport, setCertReport] = useState({ id: null, certdata: [], reportdata: []})
  const [display, setDisplay] = useState("CDM")
  const [ recordCount, setRecordCount ] = useState(100)
  const pageShown = useRef("CDM") */

 /*  const handleClick = (id) => {
    console.log(">>clicked at id: ", id)
    try {
      // http.get(`/mfccal/onebyid/${id}`)
      MfcCalService.getById(id)
        .then((res) => {
          const data = res.data.mfc_cal
          console.log(">>>mfccal response: ", data)
          setMfccalObj( { mfccal_data: data, cal_id: id })
          setDisplay("MFCCal")
          pageShown.current = "MFCCal"
        })
        }catch (err) {
            console.log(err)
        }
  }
 
  const handlePrintCert = async (calID) => {
    //console.log(">>calID passing to CDMListing = ", calID)
    Promise.all([MfcCalService.getCertByID(calID), MfcCalService.getDataReportByID(calID)])
    .then(
      data =>{
        let cert = data[0].data.data
        let report = data[1].data.data
        setCertReport( { id: calID, certdata: cert, reportdata: report })
        setDisplay("CertReport")
        pageShown.current = "CertReport"
      }
    )
  }

  const CDMListing = () => { 
    console.log("calling CDMListing..!!!")
    return (
      <>
        <Header name="CDM Listing" />
        <Grid item xs={12} className="App-tbl">
          <Table_CDMList_Limit2 handlePrintCert={handlePrintCert} />  
        </Grid>
      </>
    )
  }   */

  /* const RenderSwitch = (param) => {
    console.log(">>param: ", param)
    switch (param) {
      case "CDM":
        return <CDMListing />
      case "MFCCal":
        return <MFC_Cal_Form value={mfccalObj.mfccal_data} id={mfccalObj.cal_id} />
      case "CertReport":
        return <CertReport_Form certreport={certreport} />
      default:
        return <div>Ops..not found!</div>
    }
  } */

  return (
    <>
        <Header name="CDM Listing" />
        <Grid item xs={12} className="App-tbl">
          <Table_CDMList_Limit2 />  
         </Grid>
    </>
  )
}
  
export default App;
