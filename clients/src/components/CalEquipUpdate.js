import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import  { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import UploadPDFCert from './UploadPDFCert'
import UpdateCertPDF from './UpdateCertPDF'
import MfcCalService from '../api/MfcCalService';

const App = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const data = props.rowValues
    console.log("data passing: ",data)
    const [ calData, setCalData ] = useState( {
        calDue: null,
        lastCal: null,
        calDescr: null,
        newCertNum: null,
        updateShown: false,
        calEqID: null,
        certNum: null,
        certID: null,
        newCalDate: null,
        newCalDueDate: null
    })
    const [ isUpdateSuccess, setUpdateStatus ] = useState(false)
    const descr = ["(", data.Descr, ")"].join("")
    
    useEffect(() => {
        setCalData({...calData, calDue: data.CalDue, lastCal: data.LastCal, calDescr: descr, 
        calEqID: data.IDcalEquip, certNum: data.CertNumber, certID: data.CertID, newCalDate: new Date()
        })
      reset(data)
      console.log("data in Effect: ", calData)
    }, [data])
  
    const updateCert = () => {
        try {
            // http.put(`/mfccal/cert/equipment/update/${calData.calEqID}`, {data: calData})
            MfcCalService.updateEquipCal(calData.calEqID, {data: calData})
            .then( (res) => {
                const data = res.data.data
                console.log("CertNewID from UpdateCert: ", data) 
                setUpdateStatus(true)
            })
        }catch (err) { console.log(err) }
    }

    const downloadCert = () => {
        const id = calData.certID
        console.log("id: ", id)
      /*   http.get(`/mfccal/cert/equipment/download/${id}`, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        }) */
        MfcCalService.loadCert(id)
        .then(response => {
            const data = response.data
            console.log("data: ", data)
            const url = window.URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
            // link.remove();
        })
        .catch((err) => console.log(err))

        /* http.get(`/mfccal/cert/equipment/download/${id}.pdf`, {responseType: 'blob'})
        .then( data => {
            console.log("download res: ",data)
            const blob = new Blob([data], { type: 'application/pdf' });
            const href = window.URL.createObjectURL(blob);
            const theLink = document.createElement('a');
            theLink.href = href;
            theLink.download = id + '.pdf';
            document.body.appendChild(theLink);
            theLink.click();
            document.body.removeChild(theLink);
        }) */
    }

    const GoBack = () => { window.location.reload() }

    const handleCalendarPick = (dt) => {
        // console.log(dt)
        let selLastDate = dt
        let nextYearDate = new Date(dt)
        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1)
        nextYearDate.setDate(nextYearDate.getDate())
        // console.log("nextYeaDate: ", nextYearDate)
        let nextDueDate = nextYearDate.toLocaleDateString()
        // console.log(">>nextDate: " ,nextDueDate)
        // setCalData({...calData, lastCal: selLastDate, calDue: nextDueDate, updateShown: true})
        setCalData({...calData, newCalDate: selLastDate, newCalDueDate: nextDueDate})
    }

    const handleNewCertNum = (e) => {
        setCalData( { ...calData, newCertNum: e.target.value })
    }

    const showNewCert = () => {
        const isChecked = !calData.updateShown
        console.log("checked? ", isChecked)
        isChecked ? setCalData({...calData, updateShown: !calData.updateShown, newCalDate: new Date()})
                    : setCalData({...calData, updateShown: !calData.updateShown, newCalDate: null, newCalDueDate: null})
    }

    return (
      <>
        <Grid container xs={12} className="equip button">
            <Grid container xs={12} className="equip description" spacing="3" direction="row" justify="flex-start">
                <Grid item xs={2}>
                    Cert Number
                    <input type="text" value={calData.certNum} />
                </Grid>
                    <Grid item xs={2} className="equip lastcal">
                        Last Cal Date
                        <input type="text" value={calData.lastCal} />
                    </Grid>
                    <Grid item xs={2}>
                        Cal Due Date
                        <input type="text" value={calData.calDue} /> 
                    </Grid>
                    <Grid item xs={2}>
                        ***Select to Update***
                        <input type="checkbox"  checked={calData.updateShown} onChange={showNewCert} />
                    </Grid>
                </Grid>    
                {<Grid container xs={12} spacing={3} direction="row" className= { calData.updateShown ? "certnum" : "certnum-hidden" }>
                        <Grid item xs={2} >
                            New Cert Number
                            <input type="text" defaultValue={calData.newCertNum} {...register("certnum", {required:"true"})} onChange={handleNewCertNum} />
                        </Grid>
                        <Grid item xs={2}>
                            New Cal Date
                            <ReactDatePicker
                            selected = {new Date(calData.newCalDate)}
                            dateFormat="MM/dd/yyyy"
                            onChange = {handleCalendarPick }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            New Cal Due Date
                            <input type="text" defaultValue={calData.newCalDueDate} /> 
                        </Grid>
                        <Grid container item xs={5} spacing={0} direction="row" >
                            {!isUpdateSuccess && <UpdateCertPDF certData={calData} />}
                        </Grid>
                        { isUpdateSuccess && 
                            <Grid item xs={1} className="update-success" >
                                <p>Updated Certification Successsful!</p>
                            </Grid>
                        }
                </Grid>
                }
            <Grid container xs={12} spacing="1" direction="row" justify="flex-start">
                <Grid item xs={2}>
                    <input type="submit" onClick={downloadCert} value="DownLoad Cert" />
                </Grid>
                <Grid item xs={2}>
                    <input type="submit" onClick={GoBack} value="Back To Previous" />
                </Grid>
            </Grid>
        </Grid>
      </>
    )
  }

  export default App;