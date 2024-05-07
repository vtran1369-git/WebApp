import React, { useState, useEffect, useRef } from 'react'
import  { set, useForm } from 'react-hook-form'
import '../Form.css'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import { makeStyles } from '@material-ui/core/styles';
import Table_noheader from './Tbl_template_noheader_rowheader'
import Table_header from './Tbl_template_header'
import logo from '../logo.png'

import signed from '../views/signed.png'
import html2pdf from 'jspdf-html2canvas'
/* import html2canvas from 'html2canvas'
import jsPDF from 'jspdf' */

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import {TravelerInfo} from './TravelerInfo'
// import GetColumns from '../Utils/GetColumns'
import SimpleTable from '../Utils/SimpleTable'
import { Paper } from '@material-ui/core'
import convertBlobtoImg from '../Utils/ConvertBlobtoImg'
import TravelerService from '../api/TravelerService'
import AuthenService_admin from '../api/auth.service_admin'

const theme = createMuiTheme({
    typography: {
        fontSize: 12,
    }
    
})

const getColumns = (data) => {
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
const columnNames = () => {
    const columns = []
    const names = ["MaxFlow", "Units", "Gas", "SerialNum", "DevId"]
    names.forEach(name => 
        columns.push({
            accessor: name
        }))
    return columns
}

export default function App(props) {
    const data = props.data
    const HeaderTableVal = data.HeaderTable
    const HWTableVal = data.HWTable
    const PFTableVal = data.PFTable
    const DataTableVal = data.DataTable
    
    console.log("props.. headertable: ", props.data.HeaderTable["0"])
    const headData = props.data.HeaderTable["0"]
    const hwData = props.data.HWTable
    const pfRawData = props.data.PFTable
    const testData = props.data.DataTable

    console.log(">>>HeaderTable: ", headData)
    console.log(">>>HWTable: ",hwData)
    console.log(">>>PFTable: ",pfRawData)
    console.log(">>TestDat: ", testData)

    console.log("TechSig: ", headData["TechSig"])

    const commentsRef = useRef("")

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    /* const [ docNo , setDocNo ] = useState()
    const [ op, setOp ] = useState("")
    const [ opSign, setOpSign ] = useState()
    const [ opSignDate, setOpSignDate ] = useState(headData["TechDTG"])
    const [ opBttShowed, setOpBttShowed ] = useState(true) */
    
    const [ qaSign, setQaSign ] = useState()
    // const [ qaSignDate, setQaSignDate ] = useState(headData["QADTG"])
    const [ qaSignDate, setQaSignDate ] = useState()
    const [ qaBttShowed, setQaBttShowed ] = useState(true)
    const DATE_OPTION = { year: 'numeric', month: 'short', day: 'numeric'}
    const [calID, setCalID] = useState()
    const [cfg, setCfg] = useState( [ {"Max Flow": null}, {"Unit": null } , {"Gas": null }, {"Dev ID": null} ])
    const [pfData, setPfData] = useState()
    const isLoading = useRef(false)
    const opSigRef = useRef(null)
    const qaSigRef = useRef(null)
    const qaSignDateRef = useRef(null)
    const countRef = useRef(null)

    
    const convertBlobtoImg = (blob) => {
        const myBlob = new Uint8Array(blob.data)
        const imgBlob = new Blob([myBlob], {type: 'image/jpeg'}) 
        const urlCreator = window.URL || window.webkitURL
        const imgURL =urlCreator.createObjectURL(imgBlob)
        setTimeout(() => {
            URL.revokeObjectURL(imgBlob)
        }, 100);
        return imgURL
     } 
     
    useEffect(()=>{
        //get currentuser: 
        // const user = AuthenService_admin.getCurrentUser()
        // console.log("currentUser: ", user)
        console.log("effect..in traveler_form, props: ")
        combine_eprom_cfg_fw()
       
        if(!isLoading.current) {
            isLoading.current = true
        }
     
        console.log("qasigndate: " , headData["QADTG"])
        console.log("TECHsigndate: " , headData["TechDTG"])
        qaSignDateRef.current = headData["QADTG"]
        
        setQaSignDate(headData["QADTG"])
        const maxFlow = [], gas = [], units = [], sn = [], devId = []
        // travelerData.HWTable.forEach(each => {
        hwData.forEach(each => {
            maxFlow.push(each.max_flow)
            units.push(each.units)
            gas.push(each.gas)
            sn.push(each.serial_num)
            devId.push(each.dev_id)
        })
        setCfg( [ {"Max Flow": maxFlow}, {"Unit": units } , {"Gas": gas }, {"Dev ID": devId} ] )

        let hs = [], sp1 = [], sp2 = []
        pfRawData.forEach(each =>{
                each.hs === 0 ? hs.push("P") : hs.push("F")
                each.sp1 === 0 ? sp1.push("P") : sp1.push("F")
                each.sp2 === 0 ? sp2.push("P") : sp2.push("F")
        })
        
        setPfData( [ {"HS": hs}, {"SP1": sp1}, {"SP2": sp2} ] )
        // setComments(headData.Comments)
        commentsRef.current = headData.Comments
        console.log("comments: ", commentsRef.current)

        const opSignVal = headData["TechSig"] 
        const qaSignVal = headData["QASig"]
        if(opSignVal) {
            console.log("opsignVal is valid")
            opSigRef.current = convertBlobtoImg(opSignVal)
            // setOpBttShowed(false)
        }
        // console.log("TechSig after effect: ", headData["TechSig"])
        if(qaSignVal) {
            console.log("qaSignVal is valid")
            let imgSign = convertBlobtoImg(qaSignVal)
            qaSigRef.current = convertBlobtoImg(qaSignVal)
            setQaSign(imgSign)
            //setQaBttShowed(false)
        }
        reset(data) 
    },[data])

    console.log(">>count is ", countRef.current++)

    

    const combine_eprom_cfg_fw = () => {
        // console.log("dataVal before: ", DataTableVal)
        const eprom_cfg_fw_data = DataTableVal.slice(4, 7)
        let failCnt = 0
        eprom_cfg_fw_data.forEach((item)=> (
            item["Pass/Fail"] === "FAIL" && item["Test Item"] === "Factory EPROM" ? (eprom_cfg_fw_data[2]["Data"] = "FactEE Fail", eprom_cfg_fw_data[2]["Pass/Fail"] = "FAIL", failCnt++): 
            item["Pass/Fail"] === "FAIL" && item["Test Item"] === "CPLD Configuration" ? (eprom_cfg_fw_data[2]["Data"] = "CPLD Fail" , eprom_cfg_fw_data[2]["Pass/Fail"] = "FAIL", failCnt++) : 
            item["Pass/Fail"] === "FAIL" && item["Test Item"] === "Firmware" ? (eprom_cfg_fw_data[2]["Data"] = "FW Fail" , eprom_cfg_fw_data[2]["Pass/Fail"] = "FAIL", failCnt++) : eprom_cfg_fw_data[2]["Data"] = "No Fail"
        ))

        if (failCnt > 1) {
            eprom_cfg_fw_data[2]["Data"] = "Multi Fail"
        } 
        eprom_cfg_fw_data[2]["Test Item"] = "EPROM / Firmware"
        // console.log(">>eprom after: ", eprom_cfg_fw_data)
        DataTableVal.splice(4, 3, eprom_cfg_fw_data[2])
        const removedItems = DataTableVal.splice(12,1)
        // console.log(">>removed: ", removedItems)
        /* console.log("Data after remove and added>> ", DataTableVal)
        console.log("removedItems: ", removedItems) */
    }
    console.log(">>>errors: ", errors)
    // const numOfDevices = travelerData.HWTable.length
    const numOfDevices = hwData.length
    const handleClick = () => {
        window.location.reload()
    }
    const handleOnChange = (e) => {
        e.preventDefault()
        commentsRef.current = e.target.value
    }

    const QA_signOff = () => {
        console.log(">>qa sign off..")
        const user = AuthenService_admin.getCurrentUser()
        console.log("currentUser-ROLE & ID: ", user.role, ' ', user.id)
        const testId = headData.TestId
        console.log(`QA Signoff >> TestId: ${testId}`)
        console.log("commentsRef.current: ", commentsRef.current)
        if( user.role != "qa"){
            alert(`Your Role is NOT "QA" to Authorize Sign Off`)
        }else{
            TravelerService.updateTestEventRegistryById(testId, {comments: commentsRef.current, userId: user.id} )
            .then((res) => {
                console.log(">>QA Signoff, result from backend: ", res.data)
                let retData = res.data.data
                commentsRef.current =retData.comments
                setQaSign(convertBlobtoImg(retData.qa_sig))
                // qaSigRef.current = convertBlobtoImg(retData.qa_sig)
                // let convDate = new Date(retData.qa_dtg).toLocaleString("en-US", {timeZone:'America/Los_angeles' })
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                let convDate = new Date(retData.qa_dtg).toLocaleDateString("en-us", options)
                // let convDate = new Date(retData.qa_dtg).toDateString()
                console.log("convDate; ", convDate)
                setQaSignDate(convDate)
                // qaSignDateRef.current = convDate
                // setQaSignDate(convDate)
                //setQaBttShowed(false)
            })
        }
       
        
    }

    const getCurrentDate = () =>{
            let today = new Date();
            return today.toLocaleString('en-US', DATE_OPTION)
            //return ((today.get + 1) + "-" + today.getDate() + "-" + today.getFullYear())
            // return new Date().toLocaleString()
    }
   
    const printPDF = (name) => {
        console.log(">>printing pdf...!")
        const page = document.getElementById(name);
        html2pdf(page, {
            jsPDF: {
                format: 'A4',
                unit: 'in',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf',
            imageQuality: 0.98,
            margin: { left: 0.2, right: 0.2, top: 0.2 },
            position: 0,
            html2canvas: { 
                scrollX: 0,
                scrollY: -window.scrollY + 3,
                scale: 4, 
                loggin: true,
                width: 838,
                height: 1200,
                useCORS: true
                // height: 1130
            },
        })
    }

    const QASignDIV = () => {
        return(
            <>
                <Grid item xs={3} >  
                    <input type="submit" className= "form-control sign-bttn" onClick={QA_signOff} value="QA.Sign"/> 
                </Grid>
            </>
        )
    }

    const TravelerDIV = () => {
        const isColHeader = true
        const colHeader = ["Test Item", "Test ID", "Data", "Units", "Min", "Max", "Pass/Fail"]

        return (
        <>  
        <MuiThemeProvider theme={theme}>
            <Grid container xs="12" className="form-main" spacing={0} direction="row" justify="left" alignItems="stretch">
                <Grid item xs={12} className="form-container traveler" id="cert-form" style={{ fontSize: "0.705em" }} >
                    <Grid item xs={12} className="form-control traveler-logo">
                        <img src={logo} alt="Company logo" />
                    </Grid>
                    <Grid container xs="12" className="traveler-head" spacing={0} direction="row" justify="center" alignItems="stretch" style={{marginTop: "1px"}}>
                        <Grid item xs={8}  className="form-control traveler-headline" >    
                            TruFlow Test eTraveler
                        </Grid>
                        <Grid item xs={4}  className="form-control"> 
                            Doc#: {TravelerInfo.docNum}
                        </Grid>
                    </Grid> 
                    
                    <Grid container xs="12" className="traveler-page-info" spacing={0} direction="row" >
                        <Grid item xs={2}  className="form-control" >    
                            Page 1 of 1
                        </Grid>
                        <Grid item xs={2}  className="form-control"> 
                            Dept: {TravelerInfo.dept}
                        </Grid>
                        <Grid item xs={4}  className="form-control"> 
                            Revision Date: {TravelerInfo.revDate}
                        </Grid>
                        <Grid item xs={4}  className="form-control"> 
                            Revision: {TravelerInfo.rev}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className="traveler-section">Lot Traceability</Grid>
                    <Grid container xs="12" className="traveler-lot-pcba" component={Paper} elevation={2}>
                        {/* <Grid container xs="12" className="traveler-lot"> */}
                            <Grid container xs="12" spacing={0} direction="row" justify="center">
                                <Grid item xs={4}  className="form-control row" > 
                                Vendor: {headData.Vendor} 
                                {/* Vendor: {travelerData.HeaderTable.Vendor} */}
                                </Grid>
                                <Grid item xs={4}  className="form-control row" > 
                                Date: {headData.OrigDate} 
                                {/* Date: {travelerData.HeaderTable.OrigDate} */}
                                </Grid>
                                <Grid item xs={4}  className="form-control row" > 
                                Technician: {headData.TechName} 
                                {/* Technician: {travelerData.HeaderTable.TechName} */}
                                </Grid>
                            </Grid>
                            <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch">
                                <Grid item xs={3}  className="form-control row" > 
                                WO Number: {headData.WOnum}
                                </Grid>
                                <Grid item xs={3}  className="form-control row" > 
                                {/* {woNumBarcode} */}WO-Barcode Here
                                </Grid>
                                <Grid item xs={4}  className="form-control row" > 
                                Model Number: {headData.ModelNumber}
                                </Grid>
                                <Grid item xs={2}  className="form-control row" > 
                                Rev: {headData.ModRev}
                                </Grid>
                            </Grid>
                            <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch">
                                <Grid item xs={4}  className="form-control row last" > 
                                Serial Number: {headData.FSN}
                                </Grid>
                                <Grid item xs={4}  className="form-control row last" > 
                                {/* {snBarcode} */}
                                </Grid>
                                <Grid item xs={4}  className="form-control row last" > 
                                Config Code: {headData.configCode}
                                </Grid>
                            </Grid>
                        {/* </Grid> */}
                    </Grid>    
                    <Grid item xs={12} className="traveler-section" >PCBA</Grid>
                    <Grid container xs="12" className="traveler-lot-pcba" component={Paper} elevation={2}>    
                        <Grid container xs="12">
                            <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch">
                                <Grid item xs={4}  className="form-control row" > 
                                PCBA S/N: {headData.PCBAsn}
                                </Grid>
                                <Grid item xs={4}  className="form-control row" > 
                                Firmware P/N: {headData.FirmWarePN}
                                </Grid>
                                <Grid item xs={4}  className="form-control row" > 
                                Rev: {headData.FirmWareRev}
                                </Grid>
                            </Grid>
                            <Grid container xs="12" spacing={0} style={{paddingTop: "5px"}} >
                                <Grid item xs={4}>
                                    CPLD P/N: {headData.CPLDpn}
                                </Grid>
                                <Grid item xs={4}>
                                    Rev: {headData.CPLDrev}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container xs={12} style={{paddingTop: "0px"}}>
                        <Grid item xs={12} className="traveler-section">Hardware Configuration</Grid>
                        <Grid container xs="12" className="traveler-cfg" >
                            <Table_noheader rows={cfg} numOfDevices={numOfDevices} />
                         </Grid>
                        <Grid container xs="12" className="traveler-pf">
                            <Table_noheader rows={pfData} isColHeader={isColHeader} />
                        </Grid>
                    </Grid>

                    <Grid container xs={12} style={{paddingTop: "5px"}}>
                        <Grid container xs="12" className="traveler-data" >
                            <SimpleTable rows={testData} columns={getColumns(testData)} />
                         </Grid>
                    </Grid>

                    <Grid container xs="12" spacing={0} style={{marginTop: "5px", paddingTop: "5px", paddingBottom: "5px"}}>
                        {/* <Grid item xs={12} className="cert-label">Remarks</Grid> */}
                        Remarks:
                        <Grid item xs={12} className="form-control">
                            {/* <textarea className="traveler-comments" value={comments} onChange={handleOnChange} /> */}
                            <textarea className="traveler-comments" value={commentsRef.current} onChange={handleOnChange} /> 
                        </Grid>
                    </Grid>
                    <Grid container xs="12" spacing={0} direction="row" className="traveler-sign">
                        <Grid item xs={8} className="form-control">
                            <label>Technician</label>
                            <img src={opSigRef.current} style={{height: "30px"}}></img>
                        </Grid>
                        {/* <Grid item xs={3} className="form-control img">
                            <img src={opSigRef.current}></img>
                        </Grid> */}
                        <Grid item xs={4} className="form-control sign">
                            <label>Date:</label>
                            <p>{headData["TechDTG"]}</p>
                            {/* <p>{travelerData.HeaderTable["TechDTG"]}</p> */}
                        </Grid>
                    </Grid>
                    <Grid container xs="12" spacing={0} direction="row" className="traveler-sign">
                        <Grid item xs={8} className="form-control img">
                            <label>Inspected By</label>
                            {
                                // qaSigRef.current ? 
                                // <img src={qaSigRef.current} style={{height: "30px"}}></img>  : 
                                qaSign ?
                                <img src={qaSign} style={{height: "30px"}}></img>  : 
                                <QASignDIV /> 
                            }
                            
                        </Grid>
                      {/*   <Grid item xs={3} className="form-control img">
                            <img src={qaSigRef.current}></img>
                        </Grid> */}
                        <Grid item xs={4} className="form-control sign">
                            <label>Date:</label>
                            {/* <p>{qaSignDateRef.current}</p> */}
                            <p>{qaSignDate}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} className="button">
                    <Grid container xs="12" className="control-button"  >
                        {/* { opBttShowed && <TechSignDIV /> } */}
                       {/*  <Grid item xs={2} className= { qaBttShowed ? "form-control cert-action" :  "form-control cert-action bttn_display" }  >  
                                <input type="submit" onClick={QA_signOff} value="QA Sign Off"/>
                        </Grid> */}
                        <Grid item xs={2} className="form-control cert-action">
                            <input type="submit" onClick={() => printPDF("cert-form")} value="DownLoad"/>
                        </Grid>
                       
                        <Grid item xs={2} className="form-control cert-action">
                            <input type="submit" onClick={() => handleClick()} value="Back To TRUFLOW Listing" />
                        </Grid>
                       
                    </Grid>
                </Grid>  
            </Grid>
        </MuiThemeProvider>
        </>
        )
    }
    return (
        isLoading.current ? <TravelerDIV /> : (<div>Ops..not found!</div>) 
    ) 
}

