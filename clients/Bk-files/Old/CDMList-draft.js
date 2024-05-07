import React, { useState, useEffect, useRef } from "react";
import Table from './Table'
import "../App.css";
import Chance from "chance";
import Header from "./Header";
import http from '../api/http-common'
import MFC_Cal_Form from './MFC_CAL_Form'
import MfcCalService from "../api/MfcCalService"
import Cert_Form from './Cert_Form'

const chance = new Chance(); 

function getColumns(data) {
  const columns = [];
  const sample = data[0];
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
  const [data, setData] = useState([]);
  const [newColumns, setNewColumns] = useState([]);
  const [mfccal, setMfccal] = useState([]);
  const [isCDMListing, setIsCDMListing] = useState(true);
  const [passingId, setPassingId] = useState();
  const [certData, setCertData] = useState(null)
  const [pageDisplay, setPageDisplay] = useState( { 
    CDM: true,
    CalForm: false,
    CertForm: false
  })
  const [calID, setCalID] = useState()
  const [reportData, setReportData] = useState([])
  const isGetDataDone = useRef(null)
  const isGet2ndDataDone = useRef(null)

  useEffect(() => {
    http.get("/mfccal/all")
      .then((res) => {
        const cdmlist = res.data.cdmList;
        //console.log(">>> ", cdmlist)
        const data =cdmlist.map(item => { 
          const _id = chance.guid();
          return { _id, ...item};
        });
        setData(data);
        setNewColumns(getColumns(data))
        console.log(">>>DATA: ", data)
      })
  }, []);

 

  const handleClick = (id) => {
    console.log(">>clicked at id: ", id)
    //setIsCDMListing(false)
    setPageDisplay( {
      CDM: false,
      CalForm: true,
      CertForm: false
    })
    try {
      http.get(`/mfccal/onebyid/${id}`)
        .then((res) => {
          const data = res.data.mfc_cal
          console.log(">>>mfccal response: ", data)
          setMfccal(data)
          setPassingId(id)
          //console.log("mfccal: ", mfccal)
        })
        }catch (err) {
            console.log(err)
        }
    
  }

  const getCertByID = (id) => {
      http.get(`/mfccal/cert/getcert/${id}`)
      /* .then(res => {
        isGetDataDone.current = true
        const cert = res.data.data
        //convert blob to image
        const blob = cert.TechSig.data
        
        console.log(">>response certdata: ", cert)
        setCertData(cert)
      }) */
   
  }

  const getDataReportByID = (id) => {
    http.get(`/mfccal/cert/getreport/${calID}`)
   /*    .then(res => {
        const report = res.data.data
        console.log("getreport result: ", report )
        isGet2ndDataDone.current = true
        setReportData(report)
      }) */
  }

  const handlePrintCert = (calID) => {
    console.log(">>calID passing to CDMListing = ", calID)
    setCalID(calID)
    setPageDisplay({
      CDM: false,
      CalForm: false,
      CertForm: true
    })
    Promise.all([getCertByID(calID), getDataReportByID(calID)])
    .then(
      data =>{
        //for cert info
        isGetDataDone.current = true
        const cert = data[0].data.data
        //convert blob to image
        const blob = cert.TechSig.data
        console.log(">>response certdata: ", cert)
        setCertData(cert)
        //for reportdata
        const report = data.data.data
        console.log("getreport result: ", report )
        isGet2ndDataDone.current = true
        setReportData(report)

      }
    )

    /* try {
      // http.get(`/mfccal/getcert/${calID}`)
      http.get(`/mfccal/cert/getcert/${calID}`)
      .then(res => {
        isGetDataDone.current = true
        const cert = res.data.data
        //convert blob to image
        const blob = cert.TechSig.data
        // console.log("blob data from db: ", blob)
        
        /* const techSigBlob = new Blob(blob, {type: 'image/png'})
        // const techSigBlob = new Blob(blob, {type: 'image/png'})
        const techSigImg = URL.createObjectURL(techSigBlob)
        cert["TechSig"] = techSigImg */
        // URL.revokeObjectURL(techSigImg)
        console.log(">>response certdata: ", cert)
        setCertData(cert)
      })
    }catch(err){
      console.log("i got errors")
      console.log(err)
    }
    //get Cal report
    try {  
      http.get(`/mfccal/cert/getreport/${calID}`)
        .then(res => {
          const report = res.data.data
          console.log("getreport result: ", report )
          isGet2ndDataDone.current = true
          setReportData(report)
        })
    }catch(err){
      console.log("i got errors")
      console.log(err)
    } */
  }

  const CDMListing = () => { 
    return (
      <>
        <Header name="CDM Listing" />
        <div className="App-tbl">
          <Table minRows= {4} columns={newColumns} data={data} onclick={handleClick} handlePrintCert={handlePrintCert} />
        </div>
      </>
    )
  }  

  console.log(">>>> page display: ", pageDisplay)
  console.log("isGetdatadone= ", isGetDataDone, " 2nd: ", isGet2ndDataDone)
  return (
    <>
     {/*  {  
        pageDisplay.CDM ? <CDMListing /> :
        pageDisplay.CalForm ? <MFC_Cal_Form value={mfccal} id={passingId}/> : 
        isGetDataDone.current && isGet2ndDataDone ? <Cert_Form value={certData} reportData = {reportData} id={calID} /> : <div>Nothing</div>
      } */}
    </>
  )
}
  
export default App;
