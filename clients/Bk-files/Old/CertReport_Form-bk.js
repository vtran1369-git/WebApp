import React, { useState, useEffect } from 'react'
import  { set, useForm } from 'react-hook-form'
import '../Form.css'

import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table_noheader from './Tbl_template_noheader'
import Table_header from './Tbl_template_header'
import logo from '../logo.png'
import Shanghai_info, { shanghai_info } from './Shanghai_Info'
import signed from '../views/signed.png'
import html2pdf from 'jspdf-html2canvas'
import ReportForm from './Report_Form'
import Transpose2DimArr from '../Utils/Transpose2dimArr'

const useStyles = makeStyles({
    table: {
      minWidth: 50,
    },
  });

const Transpose = (array) => {
    const data = array
    let myArr = []
    console.log("before transpose, Arr: ", array)
    data.map((obj) => { 
            myArr.push(Object.values(obj))
    })
    
    console.log("myArr[0]: ", myArr[0].length)
    var firstArr = []
    firstArr = myArr[0]
    let len = firstArr.length
    
    let arr2 = []
    for(let i=0; i < len; i++){
            let colArr = []
            myArr.map((arr) => {
           colArr.push(arr[i])
    })
    arr2.push(colArr)
    }
    console.log("transposeArr: ", arr2)
    return arr2
   
   return myArr
}


export default function App(props) {
    //const certData = props.value
    /* console.log(">>propsval: ")
    console.log(props.value) */
    const data = props.value
    const id = props.id
    const reportVal = props.reportData
    //just added new props : reportVal for report form
    // const reportVal = Transpose2DimArr(props.reportData)
    // let reportVal = Transpose(props.reportData)

    console.log(">>CertForm, props.id: ", id)
    console.log(">>CertForm, props.reportData: ", reportVal)

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

    useEffect(()=>{
        console.log("effect..prior setCertData, data : ")
        console.log(data)
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
        // signature of Technician and QA
        let techImgURL, qaImgURL = null
        console.log("data[techSig]: ", data["TechSig"])
        
        if (data["TechSig"]) {
            techImgURL = convertBlobtoImg(data["TechSig"])
        }
        if (data["QASig"]) {
            qaImgURL = convertBlobtoImg(data["QASig"])
        }
        
        setOp(data["TechName"])
        // setOpSign(data["TechSig"])
        
        setOpSignDate(data["TechDate"])
        if (data["TechDate"]) {
            setOpSign(techImgURL)
            setOpBttShowed(false)
        }else setOpSign(null)
        setQA(data["QAName"])
        setQaSign(data["QAsig"])
        setQaSignDate(data["QAdate"])
      
        reset(data) 
    },[data])
    
    const convertBlobtoImg = (blob) => {
        // const imgURL = 'data: image/png;base64,' + blob
        const imgBlob = new Blob([blob], {type: 'image/jpeg'})
        const imgURL = URL.createObjectURL(imgBlob)
        return imgURL
        // cert["TechSig"] = imgURL
    }

    console.log(">>>errors: ", errors)

    const handleClick = () => {
        console.log("button Back to CDMListing clicked!")
        window.location.reload()
    }

    function createData(name, value) {
        return { name, value };
      }
    
    function createCalStdUsed(mfgr, model, sn, desc, lastCal, dueCal) {
        return { mfgr, model, sn, desc, lastCal, dueCal }
      }

    const handleOnChange = (e) => {
        console.log("text changed: ", e.target.value)
        setComments(e.target.value)
    }

    const tech_signOff = () => {
        http.put(`/mfccal/cert/create/${calID}`, {data: comments})
        .then((res) => {
            console.log("in response back ..", res)
            let data = res.data.data[0]
            const newCertNum = data["newCertNum"]
            // console.log("after Submit, get resp data: ", data)
            setOpSignDate(data.SignDate)
            let v = certId_rows;
            v[0]["cert number"] = newCertNum;
            setCertId_rows(v)
            setOp(data["CalName"])
            setOpSign(data["Signature"])
            setOpBttShowed(false)
        })
    }

    const onSubmit = certForm => {
        console.log(">>onSubmit signoff...!", certForm.BlocSN)
        console.log("cerComments: ", certForm.comments)
        
        http.post(`/mfccal/cert/create/${calID}`, certForm.comments)
        .then((res) => {
            const data = res.data.data
            const newCertNum = data["newCertNum"]

            console.log("after Submit, get resp data: ", data)
            setOpSignDate(data.SigDate)
            setCertId_rows(...certId_rows, certId_rows[0]["cert number"]= newCertNum)
            setOp(data["CalName"])
            // setOpSig(data["Signature"])
        })
      /*   setOp("Vien Tran")
        setOpSign(signed)
        setOpSignDate(getCurrentDate) */
        setOpBttShowed(!opBttShowed)
    }

    const QA_signOff = () => {
        console.log(">>qa sign off..")
        setQA("Henry")
        setQaSign(signed)
        setQaSignDate(getCurrentDate)
        setQaBttShowed(!qaBttShowed)
    }

    const getCurrentDate = () =>{
            let today = new Date();
            return today.toLocaleString('en-US', DATE_OPTION)
            //return ((today.get + 1) + "-" + today.getDate() + "-" + today.getFullYear())
            // return new Date().toLocaleString()
    }
   
    const printPDF = () => {
        console.log(">>printing pdf...!")
        const page = document.getElementById('cert-form');
        html2pdf(page, {
            jsPDF: {
                format: 'letter',
                unit: 'in',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf',
            imageQuality: 1,
            margin: { left: 0.2, right: 0.2, top: 0.4 },
            position: 0,
            html2canvas: { 
                scrollX: 0,
                scrollY: -window.scrollY,
                scale: 2, 
                loggin: true,
            },
        })
    }

    const TechSignDIV = () => {
        return(
            <>
                <Grid item xs={3} className= "form-control cert-action" >  
                    <input type="submit" onClick={tech_signOff} value="Tech. Sign Off"/> 
                </Grid>
            </>
        )
    }

    console.log("prior to return-opbttShowed= ", opBttShowed)
    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <>
            <Grid container xs="10" className="form-main" spacing={0} direction="row" justify="left" alignItems="stretch">
                <Grid item xs={5} className="form-container cert" id="cert-form">
                    <Grid container xs="12" spacing={0} direction="row" justify="left" alignItems="stretch">
                        <Grid item xs={8} className="form-control cert-top">
                            <img src={logo} alt="Company logo" />
                        </Grid>
                        <Grid item xs={4} className="form-control cert-addr">
                            <p>
                                {shanghai_info.address}
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch">
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
                            {shanghai_info.iso}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="cert-label standard">Calibration Standard Used</Grid>
                    <Grid container xs="12" className="grid-line" >
                        <Table_header rows= {calStdUsed_rows} />
                    </Grid>
                    <Grid container xs="12" spacing={0}>
                        <Grid item xs={12} className="cert-label">Remarks</Grid>
                        <Grid item xs={12} className="form-control grid-line comments">
                            <input type="text" className="comments" onChange={handleOnChange} />
                            {/* <input type="text" {...register("comments")} /> */}
                        </Grid>
                    </Grid>
                    <Grid container xs="12" spacing={0} direction="row" className="cert-sign">
                        <Grid item xs={3} className="form-control sign">
                            <label>Performed By</label>
                            <p>{op}</p>
                        </Grid>
                        <Grid item xs={3} className="form-control img">
                            <img src={opSign}></img>
                            {/* <img src={URL.createObjectURL(opSign)} alt="" /> */}
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
                            <img src={qaSign}></img>
                        </Grid>
                        <Grid item xs={3} className="form-control sign">
                            <label>Date:</label>
                            <p>{qaSignDate}</p>
                        </Grid>
                    </Grid>
                   
                </Grid>
                {/* display REPORT FORM  */}
                <Grid item xs={5} className="form-control report" justify-self="right" >
                    <ReportForm value = {data} reportData = {reportVal} />
                </Grid>
                
                <Grid item xs={6} className="button">
                    <Grid container xs="12" className="control-button"  >
                        {console.log(">>opBttonShowed= ", opBttShowed)}
                        { opBttShowed && <TechSignDIV /> }
                        {/* <Grid item xs={12} className= { opSign ? "form-control cert-action bttn_display" : "form-control cert-action" }  >  
                            <input type="submit" onClick={tech_signOff} value="Tech. Sign Off"/> 
                        </Grid> */}
                        <Grid item xs={3} className= { qaBttShowed ? "form-control cert-action" :  "form-control cert-action bttn_display" }  >  
                                <input type="submit" onClick={QA_signOff} value="QA Sign Off"/>
                        </Grid>
                        <Grid item xs={3} className="form-control cert-action">
                            <input type="submit" onClick={printPDF} value="Print PDF"/>
                        </Grid>
                        <Grid item xs={3} className="form-control cert-action">
                            <input type="submit" onClick={handleClick} value="Back To CDM Listing" />
                        </Grid>
                    </Grid>  
                </Grid>
            </Grid>
        </>
    )
}

