import React, { useState, useEffect, useRef } from "react";
import TFL from './TFL'
import "../Form.css";
import Header from "./Header";
import http from '../api/http-common'
import ETraveler_Form from './ETraveler_Form'
import TableMFC from '../Utils/Table-eTraveler-MFCs'
import CertReport_Form from './CertReport_Form'
import MfcCalService from "../api/MfcCalService"
import TravelerService from "../api/TravelerService";

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  // console.log(">>sample: ", sample)
  Object.keys(sample).forEach(key => {
  if (key !== "_id") {
    columns.push({
      accessor: key,
      Header: key
    });
  }
});
return columns;
}

function App() {
  const [TF, setTF] = useState({ TFData: [], TFColumns: [] });
  const [travelerData, setTravelerData] = useState({})
  const [display, setDisplay] = useState("TFList")
  
  const fsnRef = useRef()

  const [mfcs, setMfcs] = useState({
    value: [],
    shown: false
  })

  const [certreport, setCertReport] = useState({ id: null, certdata: [], reportdata: []})

  /* const handleTraveler = (row) => {
    console.log(">>handleTraveler: ", row.values.Serial_Number)
    const fsn = row.values.Serial_Number
    try{
        // http.get(`/traveler/truflow/onebyid/${fsn}`)
        TravelerService.getTravelerByFSN(fsn)
        .then( (result) => {
        console.log("backend truflow responded: ", result.data)
        setTravelerData(result.data)
        setDisplay("Etraveler")
      })
    }catch(err) { console.log(err)}
  }

  const listMFCs = React.useCallback((row) => {
    console.log(">>listMFCs: ", row.values.Serial_Number)
    const fsn = row.values.Serial_Number
    fsnRef.current = row.values.Serial_Number
    try{
    //   http.get(`/traveler/truflow/mfcs/${fsn}`)
        TravelerService.getMFCsByFSN(fsn)
        .then( result => {
            const data = result.data.data
            // console.log("get data response from server: ", data)
            const dataObj =data
            const valObjArr = Object.values(dataObj)
            // console.log("DATAROW: ", valObjArr)
            setMfcs( { value: valObjArr, shown: true })
            // setDisplay("TFList-MFCs")
        })
        }catch(err) { console.log(err)}
    }
  ) */

  const printCert = (calID) => {
    console.log("Printing..Cert!")
    Promise.all([MfcCalService.getCertByID(calID), MfcCalService.getDataReportByID(calID)])
    .then(
      data =>{
        let cert = data[0].data.data
        let report = data[1].data.data
        setCertReport( { id: calID, certdata: cert, reportdata: report })
        setDisplay("CertReport")
      }
    )
  }

  const printReport = () => {
    console.log("Printing...report!")
  }
  const columns = [{ accessor: "id", header: "Index" }, { accessor: "SN", header: "Serial Number"}, { accessor: "Gas", header: "Gas" }, { accessor: "FlowStr", header: "Flow" },
  {accessor: "calDate",  header: "Cal Date"}, {accessor: "calName", header: "Calibrated by"}, {accessor: "QAdate",  header: "QA Date"}
  ]

  const TFListing = () =>{
    console.log("tflising>>fsn: ", mfcs.fsn)
    return (
      <>
      {/* <Header name="TruFlow Test Listing" /> */}
      <div className="App-tbl">
        <TFL />
      </div>
      <div className="mfcs-detail">
        {mfcs.shown && <TableMFC fsn={fsnRef.current} rows={mfcs.value} columns={columns} onselect_printCert={ printCert } onselect_printRpt={ printReport }/>}
      </div>
      </>
    )
  }

  const MFC_List = () => {
    return (
      <div className="mfcs-detail">
        <TableMFC rows={mfcs.value} columns={columns} onselect_printCert={ printCert } onselect_printRpt={ printReport } />
      </div>
    )
  }

  const RenderSwitch = (param) =>{
    switch(param) {
      case "TFList":
        return <TFListing />
      /* case "Etraveler":
        return <ETraveler_Form data={travelerData} /> */
      case "CertReport":
        return <CertReport_Form certreport={certreport} />
      /* case "TFList-MFCs":
        return (
          <>
            <TFListing />  
            <div className="mfcs-detail"><MFC_List /></div>
          </>
        ) */
      default: 
        return <div>Ops..not found!</div>
    }
  }

  return (
      <>
        <TFL />
        {/* {RenderSwitch(display)} */}
      </>
  )
  }
  
export default App;
