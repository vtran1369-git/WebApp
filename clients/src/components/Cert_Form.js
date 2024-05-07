import React, { useState, useEffect, useRef } from 'react'
import  { set, useForm } from 'react-hook-form'
// import '../Form.css'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import Table_noheader from './Tbl_template_noheader'
import Table_header from './Tbl_template_header'
import logo from '../views/logo.png'
import { Info } from './DataInfo'
import html2pdf from 'jspdf-html2canvas'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

// import ReactToPrint from 'react-to-print'
import PrintPage from './PrintPage'

const theme = createMuiTheme({
    typography: {
        fontSize: 12,
    }
    
})

export default function App(props) {
    const data = props.value
    const id = props.id
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [ certId_rows , setCertId_rows ] = useState()
    const [ customer_rows, setCustomer_rows ] = useState()
    const [ devId_rows, setDevId_rows ] = useState()
    const [ calStdUsed_rows, setCalStdUsed_rows ] = useState()
    const [ op, setOp ] = useState("")
    const [ opSign, setOpSign ] = useState(null)
    const [ opSignDate, setOpSignDate ] = useState("")
    const [ opBttShowed, setOpBttShowed ] = useState(true)
    const [ qa, setQA ] = useState("")
    const [ qaSign, setQaSign ] = useState(null)
    const [ qaSignDate, setQaSignDate ] = useState("")
    const [ qaBttShowed, setQaBttShowed ] = useState(true)
    const [ certData, setCertData ] = useState()
    const DATE_OPTION = { year: 'numeric', month: 'short', day: 'numeric'}
    const [calID, setCalID] = useState()
    const [comments, setComments] = useState("")

    
    const divPrint = useRef(null)

    useEffect(()=>{
      /*   console.log("effect..in Cert_form, data : ")
        console.log(data) */
        // setCertData(props.value)
        setCertData(data)
        setCalID(id)
        setCertId_rows(
            [
                { "Cert Number" : data.CertNum},
                { "Date of Calibration" : data.CalDate},
                { "Next Due Calibration" : data.NextCal}
            ]
        )    
        setCustomer_rows(
            [
                { "Name" : data.CustomerName },
                { "Address" : data.Address1},
                { "City,State" : data.Address2},
                { "Country" : data.Address3}
            ]
        )
        setDevId_rows([
            { "Manufacturer" : data["DUT Mfr"]},
            { "Model" : data["DUT model"]},
            { "Description" : data["DUT Descr"]},
            { "Serial Number" : data["DUT SN"]},
            { "Gas" : data["DUTProcGas"]},
            { "Max Flow Rate" : data["DUTMaxFlow"]}
        ])
        setCalStdUsed_rows([
            { "DigMeter" : [ data["DigMeterMfr"], data["DigMeterModel"], data["DigMeterSN"],
                data["DigMeterDescr"], data["DigMeterLastCal"], data["DigMeterDueCal"] ],
            },
            { "Bloc" : [ data["BlocFMMfr"], data["BlocFMModel"], data["BlocFMSN"], 
                data["BlocFMDescr"], data["BlocFMLastCal"], data["BlocFMDueCal"]]
            }
        ])
        // console.log("data: ", data)
        setComments(data.Remarks)

        // signature of Technician and QA
        let techImgURL, qaImgURL = null
        //console.log("data[techSig]: ", data["TechSig"])
        
        if (data["TechSig"]) {
            techImgURL = convertBlobtoImg(data["TechSig"])
            //console.log(">>techImgURL: ", techImgURL)
        }
        if (data["QAsig"]) {
            qaImgURL = convertBlobtoImg(data["QAsig"])
        }
        
        setOp(data["TechName"])
        // setOpSign(data["TechSig"])
        
        setOpSignDate(data["TechDate"])

        if (data["TechDate"]) {
            // setOpSign(techImgURL)
            setOpSign(convertBlobtoImg(data["TechSig"]))
            setOpBttShowed(false)
        }else setOpSign(null)

        //console.log("QASign: ", data["QAsig"])
        
        if (data["QAdate"]){
            setQaSign(convertBlobtoImg(data["QAsig"]))
            setQaBttShowed(false)
        }

        setQA(data["QAName"])
        // setQaSign(qaImgURL)
        setQaSignDate(data["QAdate"])
        reset(data) 
    },[data])
    
    const convertBlobtoImg = (blob) => {
       /*  const base64String = btoa(String.fromCharCode.apply(null,blob.data))
        const imgBlob = `data:image/jpeg;base64,${base64String}`
        return imgBlob */
        const myBlob = new Uint8Array(blob.data)
        const imgBlob = new Blob([myBlob], {type: 'image/jpeg'}) 
        const urlCreator = window.URL || window.webkitURL
        const imgURL =urlCreator.createObjectURL(imgBlob)
        setTimeout(() => {
            URL.revokeObjectURL(imgBlob)
        }, 100);
        // URL.revokeObjectURL(imgBlob)
        return imgURL
    }

    console.log(">>>errors: ", errors)

    /* const refreshPage = () => {
        window.location.reload(false)
    } */

    const handleClick = () => {
        // console.log("button Back to CDMListing clicked!")
        // window.location.reload()
        window.history.go(-1)
    }

    function createData(name, value) {
        return { name, value };
      }
    
    function createCalStdUsed(mfgr, model, sn, desc, lastCal, dueCal) {
        return { mfgr, model, sn, desc, lastCal, dueCal }
      }

    const handleOnChange = (e) => {
        //console.log("text changed: ", e.target.value)
        setComments(e.target.value)
    }

    const tech_signOff = () => {
        http.put(`/mfccal/cert/create/${calID}`, {data: comments})
        .then((res) => {
            // console.log("in response back ..", res)
            let data = res.data.data[0]
            const newCertNum = data["newCertNum"]
            //console.log("sign off>>data from backend:  ", data)
            setOpSignDate(data.SignDate)
            let v = certId_rows;
            v[0]["cert number"] = newCertNum;
            setCertId_rows(v)
            setOp(data["CalName"])
            setOpSign(convertBlobtoImg(data["Signature"]))
            // setOpSign(data["Signature"])
            setOpBttShowed(false)
            //console.log(`signoff is ${opSign}`)
            //console.log(`signDate is ${opSignDate}`)
        })
    }

    const QA_signOff = () => {
        alert("QA Needs to Sign Off at the Final Step by Truflow eTraveler")
        /* console.log(">>qa sign off..")
        setQA("Henry")
        setQaSign(signed)
        setQaSignDate(getCurrentDate)
        setQaBttShowed(!qaBttShowed) */
    }

    const getCurrentDate = () =>{
            let today = new Date();
            return today.toLocaleString('en-US', DATE_OPTION)
            //return ((today.get + 1) + "-" + today.getDate() + "-" + today.getFullYear())
            // return new Date().toLocaleString()
    }
   
    const printPDF = (name) => {
        //console.log(">>printing pdf...!")
        const page = document.getElementById(name);
        html2pdf(page, {
            jsPDF: {
                format: 'A4',
                unit: 'in',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf',
            imageQuality: 0.98,
            margin: { left: 0.2, right: 0.2, top: 0.4 },
            position: 0,
            html2canvas: { 
                scrollX: 0,
                scrollY: -window.scrollY + 3,
                scale: 4, 
                loggin: true,
                width: 838,
                height: 1130,
                useCORS: true
            },
        })
    }

    const TechSignDIV = () => {
        return(
            <>
                <Grid item xs={3}>  
                    {/* <input type="submit" onClick={tech_signOff} value="Tech. Sign Off"/>  */}
                    <input type="submit" className= "form-control sign-bttn" onClick={tech_signOff} value="Tech.Sign"/>
                </Grid>
            </>
        )
    }

    const QASignDIV = () => {
        return(
            <>
                <Grid item xs={3}  >  
                    <input type="submit" className= "form-control sign-bttn" onClick={QA_signOff} value="QA.Sign"/>
                </Grid>
            </>
        )
    }

 /*    const PrintPage = (props) => {
        const divPrint = props.divRef
        const pageName = props.pageName
        const pageStyle = `{ size: 2.5in 4in }`;
        return (
            <div>
                <ReactToPrint
                    pageStyle={pageStyle}
                    trigger={() => <button style={{height: "28px"}}>{pageName}!</button>}
                    content={() => divPrint.current}
                />
            </div>
        );
    } */

    return (
        <>  
             <MuiThemeProvider theme={theme}>

                <Grid container xs="12" className="form-main" spacing={0} direction="row" justify="left" alignItems="stretch">
                    <Grid ref={divPrint} item xs={12} className="form-container cert" id="cert-form" style={{ fontSize: "0.705em" }} >
                        <Grid container xs="12" spacing={0} direction="row" justify="left" alignItems="stretch">
                            <Grid item xs={8} className="form-control cert-top">
                                <img src={logo} alt="Company logo" />
                            </Grid>
                            <Grid item xs={4} className="form-control cert-addr">
                                <p>
                                    {Info["SantaClara_address"]}
                                </p>
                            </Grid>
                        </Grid>
                        <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch" style={{marginTop: "5px"}}>
                            <Grid item xs={8}  className="form-control cert-header" >    
                                <h2>Certificate Of Calibration</h2>
                            </Grid>
                            <Grid item xs={4}  className="form-control"> 
                                <Grid container spacing={0} className="grid-line">
                                    <Table_noheader rows={certId_rows} />
                                </Grid>  
                            </Grid>
                        </Grid> 
                        <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch">
                            <Grid item xs={5} className="cert-label" >Customer</Grid><Grid xs={7} className="cert-label" >Device Identity</Grid>
                            <Grid item xs={5}  className="form-control" > 
                                <Grid container xs="12" className="grid-line" >
                                    <Table_noheader rows= {customer_rows} />
                                </Grid>
                            </Grid>
                            <Grid item xs={7}  className="form-control"> 
                                <Grid container xs="12" className="grid-line">
                                    <Table_noheader rows = {devId_rows} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container xs="12" spacing={0} direction="row" justify="flex-start" >
                            <Grid item xs={12} className="form-control iso">
                                {Info.iso}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="cert-label standard">Calibration Standard Used</Grid>
                        <Grid container xs="12" className="grid-line" >
                            <Table_header rows= {calStdUsed_rows} />
                        </Grid>
                        <Grid container xs="12" spacing={0}>
                            <Grid item xs={12} className="cert-label">Remarks</Grid>
                            <Grid item xs={12} className="form-control grid-line comments">
                                <textarea className="comments" value={comments} onChange={handleOnChange} />
                                {/* <input type="text" className="comments" onChange={handleOnChange} /> */}
                            </Grid>
                        </Grid>
                        <Grid container xs="12" spacing={0} direction="row" className="cert-sign">
                            <Grid item xs={3} className="form-control sign">
                                <label>Performed By</label>
                                <p>{op}</p>
                            </Grid>
                            <Grid item xs={3} className="form-control img">
                                {/* <img src={opSign}></img> */}
                                { opBttShowed ? <TechSignDIV /> : <img src={opSign}></img>}
                            </Grid>
                            <Grid item xs={3} className="form-control sign">
                                <label>Date:</label>
                                <p>{opSignDate}</p>
                            </Grid>
                        </Grid>
                        <Grid container xs="12" spacing={0} direction="row" className="cert-sign">
                            <Grid item xs={3} className="form-control sign">
                                <label>Inspected By</label>
                                <p>{qa}</p>
                            </Grid>
                            <Grid item xs={3} className="form-control img">
                                { qaBttShowed ? <QASignDIV /> : <img src={qaSign}></img> }
                            </Grid>
                            <Grid item xs={3} className="form-control sign">
                                <label>Date:</label>
                                <p>{qaSignDate}</p>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={3} className="form-control docno" justify="left">
                            {Info.docNo}
                        </Grid>
                    </Grid>
                    <Grid item xs={8} className="button">
                        <Grid container xs="12" className="control-button" style={{marginTop: "12px"}}>
                            <Grid item xs={2} className="form-control cert-action">
                                <input type="submit" onClick={() => printPDF("cert-form")} value="DownLoad Certificate"/>
                            </Grid>
                            <Grid item xs={2} className="form-control cert-action">
                                <input type="submit" onClick={() => printPDF("report-form")} value="DownLoad Report"/>
                            </Grid>
                            <Grid item xs={2} className="form-control cert-action">
                                <input type="submit" onClick={() => handleClick()} value="Back To Previous Page" />
                            </Grid>
                            <Grid item xs={2} className="form-control cert-action">
                                <PrintPage pageName="PRINT CERT" divRef = {divPrint} />
                            </Grid>
                        </Grid>
                    </Grid>  
                </Grid>
            </MuiThemeProvider>
        </>
    )
}

