import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import  { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import OpenDialog from './OpenDialog'

const App = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const data = props.rowValues
    const [ calData, setCalData ] = useState( {
        calDue: null,
        lastCal: null,
        calDescr: null,
        newCertNum: null,
        isUpdate: false,
        calEqID: null
    })
    const [ isUpdateSuccess, setUpdateStatus ] = useState(false)
    // console.log("isUpdate: ", calData.isUpdate)
    const  calDueDate= data.CalDue 
    const  lastCalDate = data.LastCal 
    const descr = ["(", data.Descr, ")"].join("")
    const calInfo = [data.Mfr, data.Model, data.Type, descr, data.SN].join(' ') 
    const calEquipId = data.IDcalEquip
    /* 
    console.log("data in CertUpdate: ", data)
    console.log("calInfo: ", calInfo)
 */
    useEffect(() => {
      setCalData({...calData, calDue: calDueDate, lastCal: lastCalDate, calDescr: calInfo, calEqID: calEquipId })
      reset(data)
      console.log("data in Effect: ", calData)
    }, [data])
  
    const updateCert = () => {
        //calling "updateCEstdCal(CEid, Cert#, CalDateIn(Date), CalDueIn(Date))
        // console.log(">>> ", calData.calEqID, ' ', calData)
        try {
            http.put(`/mfccal/cert/equipment/update/${calData.calEqID}`, {data: calData})
            .then( (res) => {
                const data = res.data.data
                console.log("data from UpdateCert: ", data)
                setUpdateStatus(true)
            })
        }catch (err) { console.log(err) }
    }

    const downloadCert = () => {

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
        setCalData({...calData, lastCal: selLastDate, calDue: nextDueDate, isUpdate: true})
    }

    const handleNewCertNum = (e) => {
        setCalData( { ...calData, newCertNum: e.target.value })
    }

    return (
      <>
        {/* <form onSubmit={handleSubmit(onsubmit)}> */}
        <Grid container xs={12} className="equip button">
            <Grid container xs={12} className="equip description" spacing="3" direction="row" justify="flex-start">
                <Grid item xs={3}>
                    Description
                    <textarea style={{padding: "5px"}} defaultValue={calData.calDescr}></textarea>
                </Grid>
                <Grid item xs={7} style={{height: '150px'}}>
                    <Grid container xs={12} spacing="2">
                        <Grid item xs={2}  className="equip lastcal">
                            Last Cal Date
                            <ReactDatePicker
                            selected = {new Date(calData.lastCal)}
                            dateFormat="MM/dd/yyyy"
                            onChange = {handleCalendarPick }
                            />
                            <p className="comment">Click to Choose a New Cal Date!</p>
                        </Grid>
                        <Grid item xs={2}>
                            Cal Due Date
                            <input type="text" defaultValue={calData.calDue} /> 
                            
                        </Grid>
                        <Grid item xs={2}  className= { calData.isUpdate ? "certnum" : "certnum-hidden" }>
                            New Cert Number
                            <input type="text" defaultValue={calData.newCertNum} onChange={handleNewCertNum} />
                        </Grid>
                        { isUpdateSuccess && 
                            <Grid item xs={4} className="update-success" >
                                <p>Updated Certification Successsful!</p>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid container xs={12} spacing="1" direction="row" justify="flex-start">
                <Grid item xs={2}>
                    { 
                        !isUpdateSuccess && <input type="submit" onClick={updateCert} value="UpDate Cert" />
                    }
                </Grid>
                <Grid item xs={2}>
                    <input type="submit" onClick={downloadCert} value="DownLoad Cert" />
                </Grid>
                <Grid item xs={2}>
                    <input type="submit" onClick={GoBack} value="Back To Previous" />
                </Grid>
                {/* <Grid item xs={2}>
                    <label for="certPdf">Choose File To Upload</label>
                    <input type="file" accept=".pdf, image/png" /> 
                </Grid> */}
                <Grid><OpenDialog /></Grid>
            </Grid>
        </Grid>
        {/* </form> */}
      </>
    )
  }

  export default App;