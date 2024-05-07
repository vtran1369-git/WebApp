import React, { useState, useEffect } from 'react'
//import ReactDatePicker from 'react-datepicker'
import  { useForm } from 'react-hook-form'
import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import MfcCalService from '../api/MfcCalService'

export default function App(props) {
    const data  = props.value
    const id = props.id
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [mfccal, setMfccal] = useState(data);
    const [wo, setWo] = useState([])
    const [ submitted, setSubmitted ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)
    const [submitResp, setSubmitResp] = useState()
    const headerRedirect = "MFC Calibration Registry"
    const headerNew = "New MFC Calibration Registry"

    useEffect(() =>{
        setMfccal(data)
        reset(data)
    }, [data])

    const onSubmit = formdata => {
        //console.log(">>>SUBMIT>>: ", formdata)
        setMfccal(formdata) //why this didn't update the state "mfccal" ?? so using direct value formdata instead of mfccal
        // http.put(`/mfccal/update/${id}`, mfccal)
        http.put(`/mfccal/update/${id}`, formdata) 
        .then(res => {
                setSubmitted(true)
            /*     console.log(res.data)
                console.log(res.data.message) */
                setSubmitResp(res.data.message)
            })
            .catch(e => {
                console.log(">>>> error: ", e)
            })
    }
    
    const newMfcCal = () => {
        setSubmitted(false)
        reset()
    }
    console.log(">>>errors: ", errors)

    useEffect(() => {
        console.log(">>run useEffect FROM MFC_CAL_FORM")
        http.get("/workorder/all")
        .then((res) => {
            const rtn = res.data.work_orders
            //console.log(">>rtn: ", rtn)
            const data =rtn.map(item => { 
                return item["WO Number"]
            })
            setWo(data)
        })
    }, [])

    const refreshCDMListingPage = () => {
        window.location.reload()
    }

    const handleClick = () => {
        window.location.reload()
    }
    return (
        <>
            <div className="form-container mfccal">
                {   submitted ? (
                    <>
                    <div >
                        {/* <h4>You submitted successfully!</h4> */}
                        <h2>{submitResp }</h2>
                    </div>
                    <button className="btn btn-success" onClick={refreshCDMListingPage}>
                        Back to CDM Listing
                    </button>
                    </>
                    ):(
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Header name ="MFC Calibration" />
                            <Grid container xs="12" spacing={3} direction="row" justify="flex-center" alignItems="flex-center">
                                <Grid container xs="12" className="field-editable" spacing="3">
                                    <Grid item xs={3}  className="form-control">    
                                        <label>Work Order</label>
                                        <select value= {mfccal.wo} {...register("wo")}>
                                            { 
                                                wo.map((item, key) => <option key={key} value={item}>{item}</option>) 
                                            }
                                        </select >
                                    </Grid>   
                                    <Grid item xs={3} className="form-control">
                                        <label>DUT Address</label>
                                        <input type="text" defaultValue={mfccal.dutaddress} {...register("dutaddress")} />
                                    </Grid>
                                    <Grid item xs={3} className="form-control">
                                        <label>As Found/Left</label>
                                        <select value={mfccal.asfoundleft} {...register("asfoundleft")}>
                                            {
                                                ["LEFT", "FOUND", "FOUND LEFT"].map(value => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))
                                            }
                                        </select>
                                    </Grid>
                                    <Grid item xs={3} className="form-control">
                                        <label>K-Factor</label>
                                        <input type="text" defaultValue={mfccal.kfactor} {...register("kfactor")} />
                                    </Grid>
                                </Grid>
                                <Grid container xs="12" spacing="3" className="field-nonedit">
                                    <Grid item xs={4} className="form-control">
                                        <label>Molbloc</label>
                                        <input type="text" value={mfccal.molbloc} {...register("molbloc")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Molbox</label>
                                        <input type="text" value={mfccal.molbox} {...register("molbox")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Ref Range</label>
                                        <input type="text" value={mfccal.refrange} {...register("refrange")} />
                                    </Grid>

                                    <Grid item xs={4} className="form-control">
                                        <label>Flow Range</label>
                                        <input type="text" value={mfccal.flowrange} {...register("flowrange")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>DUT Range</label>
                                        <input type="text" value={mfccal.dutoutrange} {...register("dutoutrange")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>DUT Tolerance</label>
                                        <input type="text" value={mfccal.duttolerance} {...register("duttolerance")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Test Gas</label>
                                        <input type="text" value={mfccal.testgas} {...register("testgas")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Process Gas</label>
                                        <input type="text" value={mfccal.procgas} {...register("procgas")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Pressure(psi)</label>
                                        <input type="text" value={mfccal.psi} {...register("psi")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Operator</label>
                                        <input type="text" value={mfccal.operator}{...register("operator")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Station</label>
                                        <input type="text" value={mfccal.station} {...register("station")} />
                                    </Grid>
                                    <Grid item xs={4} className="form-control">
                                        <label>Cal Date</label>
                                        <input type="text" value={mfccal.calDTG} {...register("caldt")} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} className="form-control submit" style={{ marginTop: 30 }}>
                                    <input type="submit" value="Update"/>
                                </Grid>
                                <Grid item xs={3} className="form-control submit" style={{ marginTop: 30 }}>
                                    <input type="submit" onClick={handleClick} value="Back To Previous" />
                                </Grid>
                            </Grid> 
                    </form>
                    )
                }
            </div>
        </>
    )
}

