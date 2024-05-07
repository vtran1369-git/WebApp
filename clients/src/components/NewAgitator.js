import React, { useState, useEffect } from 'react';

import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import  { useForm } from 'react-hook-form';
import Modal  from './Modal'
import AGITATOR from '../api/AgitatorService'
import WO from '../api/WOService'
import Button from 'react-bootstrap/Button';


export default function App() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    // const [reqDate, setReqDate] = useState("")
    const [ op, setOp ] = useState("")
    const [ opSign, setOpSign ] = useState(null)
    const [ opSignDate, setOpSignDate ] = useState("")
    const [ opBttShowed, setOpBttShowed ] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const [opID, setOpID] = useState(null)
    const [opDate, setOpDate] = useState(null)
    const [qaID, setQAID] = useState(null)
    const [qaDate, setQADate] = useState(null)
    const [finalQAID, setFinalQAID] = useState(null)
    const [finalQADate, setFinalQADate] = useState(null)
    const [sn, setSN] = useState(null)
    const [wo, setWO] = useState(null)
    const [model, setModel] = useState(null)
    const [submitBtt_Disable, setSubmitBtt_Disable] = useState(false)
    const [progress, setProgress] = useState("New")
    const [signed, setSigned] = useState(null)

    useEffect(()=>{
        console.log("RUNNING ..EFFECT")
       
      },[])
      
    const onSubmit = (data) => { 
        setSubmitBtt_Disable(true)
        console.log("submit data: ")
        console.log(data)
        AGITATOR.create(data)
            .then( res => {
                console.log("server responding: ")
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            });
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setSN(e.target.value)
    }

    const getWO = (e) =>{
        e.preventDefault();
        console.log("sn: " + sn)
        WO.getWOBySN(sn)
            .then( res =>{
                console.log("respond: ")
                console.log(res.data.data[0])
                let sn = res.data.data[0].fsn_string;
                let getWO = res.data.data[0].wo_num;
                let getModel = res.data.data[0].agilePartNum
                console.log("SN & WO & model :" + sn + " " + getWO + " " + model)
                setWO(getWO)
                setModel(getModel)
                setValue("wo_num", getWO)
                setValue("model_num", getModel)
                setValue("opDate", opDate)
                setValue("qaDate", qaDate)
                setValue("finalQaDate", finalQADate)
            })
            .catch(e => {
                console.log(e)
            });
    }

    const handleRefresh = (e) => {
      window.location.reload()
     
    }
    return (
        <>
        <div className="form-container agitator">
            <Header name="Agitator Motor Assembly eTRAVELER" />
            <Grid container xs={12} spacing="1">
                <div className="grid-container">
                    <div className='item1'>ThermoFisher<br/>Scientific</div>
                    <div className='item2'>Agitator Motor Assembly Traveler</div>
                    <div className='item3'>Doc #: F910-2076-001</div>
                    <div className='item4'>Rev: 06</div>
                    <div className='item5'>ECO: 018638</div>
                    <div className='item6'>Page 1 of 1</div>
                    <div className='item7'>Record Owner: Manufacturing Manager</div>
                    <div className='item8'>Effective Date: 28DEC2022</div>
                </div> 
            </Grid>
            <form className="agitator" id="submit-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container xs={12} spacing="0" direction="row" justify="flex-start">
                    <Grid  className="form-control agitator"> 
                        <label>Serial Number</label>   
                        <input type="text" placeholder='Serial Number' {...register("serial_num", {required: false, maxLength: 30})} onChange={handleChange} />
                        <button name='getwo' onClick={getWO} style={{marginLeft:"20px"}}>FIND</button>
                    </Grid>
                    <Grid  className="form-control agitator"> 
                        <label>Work Order Number</label>   
                        <input type="text" placeholder='Work Order Number' value={wo} {...register("wo_num", {required: false, maxLength: 30})}  />
                    </Grid>
                    <Grid className="form-control agitator last-row">   
                            <label>Technician</label>
                            <input type="text" placeholder='Technician Name' {...register("tech_name", {required: false, maxLength: 20})} />
                            <label1>Date</label1>
                            <input type='date' {...register("tech_date")} />
                    </Grid>
                    <Grid  className="form-control agitator"> 
                        <label>Model Number</label>   
                        <input type="text" placeholder='Model Number' value={model} {...register("model_num", {required: false, maxLength: 30})} />
                        <label1>Rev.</label1>   
                        <input type="text" style={{width: '50px', textAlign: 'center'}}{...register("model_rev", {required: false, maxLength: 1})}  />
                    </Grid>
                    <Grid  className="form-control agitator last-row"> 
                        <label>PO Number</label>   
                        <input type="text" placeholder='PO Number' {...register("po_num", {required: false, maxLength: 30})} />
                        <label1>Customer</label1>   
                        <input type="text" name='customer' placeholder='Customer' {...register("customer", {required: false, maxLength: 30})} />
                    </Grid>
                    <Grid container className="form-container motor" xs="12" spacing={2} direction="row" justify="flex-center" alignItems="flex-center" >
                        <Grid container className='checkbox'>
                            <Grid item xs= {6} className='headline-motor'>Agitator Motor (checkone)</Grid>
                            <Grid item xs= {2} className='headline-motor'>Motor SN</Grid>
                            <Grid item xs= {2} className='headline-motor'>Motor Turn CW & CCW?</Grid>
                            <Grid item xs= {2} className='headline-motor'>Run Entire Range?</Grid>
                    
                            <Grid item xs= {2} className='headline-motor'>
                                <input className="radio" type='radio' {...register("motor_name")} value="Kollmorgen" checked={true} />
                                <label for="kollmorgen">KollMorgen</label> 
                            </Grid>
                            <Grid item xs= {2} className='headline-motor'>
                                <input className="radio" type='radio' {...register("motor_name")} value="Maxon" />
                                <label for="Maxon">Maxon</label> 
                            </Grid>
                            <Grid item xs= {2} className='headline-motor'>
                                <input className="radio" type='radio' {...register("motor_name")} value="Teknic" />
                                <label for="Teknic">Teknic</label> 
                            </Grid>
                            <Grid item xs= {2} className='headline-motor'>
                                <input type='text' placeholder='Motor SN'{...register("motor_sn")}/>
                            </Grid>
                            <Grid item xs= {2} className='headline-motor'>
                                <input className="radio" type='radio' {...register("motor_turn_cw_ccw")} value="yes" checked={true} />
                                <label for="CW">Yes</label>
                                <input className="radio" type='radio' {...register("motor_turn_cw_ccw")} value='no' />
                                <label for="ccw">No</label> 
                            </Grid>
                            <Grid item xs= {2} className='headline-motor'>
                                <input className="radio" type='radio' {...register("run_entire_range")} value='yes' checked={true}/>
                                <lable for="range">Yes</lable>
                                <input className="radio" type='radio' {...register("run_entire_range")} value='no'/>
                                <lable for="range">No</lable>
                            </Grid>
                        </Grid>
                        {/* <Grid item xs={12} className='form-control agitator'> */}
                            <Grid item={9} className='label_attached'>
                                Is the Product and Serial Number Label attached to the Agitator Motor:
                            </Grid> 
                            <Grid item={3}>
                                <input className="radio" type='radio' {...register("prod_sn_labels_attached")} value='yes' checked={true}/>
                                <lable for="prodsnLabel">Yes</lable>
                                <input className="radio" type='radio' {...register("prod_sn_labels_attached")} value='no'/>
                                <lable for="prodsnLabel">No</lable>
                            </Grid>
                        {/* </Grid> */}
                        <Grid  item xs={12} className="form-control agitator"> 
                            <label>Supplier Name</label>   
                            <input type="text" placeholder='Supplier name' {...register("supplier_name", {required: false, maxLength: 30})} />
                        </Grid>
                        <Grid item xs="12"className='form-control agitator' style={{display: "flex"}} >
                            <Grid item={2}>
                                <label>Performed By</label>
                            </Grid>
                             <Grid item xs={3} name='qa'>
                                <Modal edited="no" role="Tech" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setOpID} setDateFunct={setOpDate}/>
                                <input type='hidden' {...register("opID", {value: {opID}.opID})} />
                            </Grid>
                            <Grid item={3} className='sign-date' style={{display:"flex", flexDirection: "row", alignItems: "center"}} >
                                <label>Date</label>
                                {/* <textarea {...register("opDate", setValue("opDate",opDate))} /> */}
                                <input type='date' {...register("opDate", setValue("opDate",opDate))} /> 
                            </Grid>
                        </Grid>
                        <Grid className="form-control agitator">
                            <p>QA Reviewed this Traveler and Product Under Test for conformance to specifications provided.</p>
                        </Grid>
                        {/* <Grid className="form-control agitator last-row">    */}
                        <div className='form-control agitator hidden' >
                            <Grid item xs="12"className='form-control agitator' style={{display: "flex"}} >
                                <Grid item={2}>
                                    <label>QA Reviewed By</label>
                                </Grid>
                                <Grid item xs={3} name='qa'>
                                    {/* <Modal signDate={qaDate} funct={setQAID} setDateFunct={setQADate}/> */}
                                    <Modal edited="no" role="QA" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setQAID} setDateFunct={setQADate}/> 
                                    <input type='hidden' {...register("qaID", {value: {qaID}.qaID})} />
                                </Grid>
                                <Grid item={3} className='sign-date' style={{display:"flex", flexDirection: "row", alignItems: "center"}} >
                                    <label>Date</label>
                                    <input type='date' {...register("qaDate", setValue("qaDate", qaDate))} />
                                </Grid>
                            </Grid>

                            <Grid item xs="12"className='form-control agitator' style={{display: "flex"}} >
                                <Grid item={2}>
                                    <label>Final QA Reviewed By</label>
                                </Grid>
                                <Grid item xs={3} name='qa'>
                                    <Modal edited="no" role="FinalQA" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setFinalQAID} setDateFunct={setFinalQADate}/>
                                    <input type='hidden' {...register("finalQAID", {value: {finalQAID}.finalQAID})} />
                                </Grid>
                                <Grid item={3} className='sign-date' style={{display:"flex", flexDirection: "row", alignItems: "center"}} >
                                    <label>Date</label>
                                    <input type='date' {...register("finalQADate", setValue("finalQADate", finalQADate))} />
                                </Grid>
                                <Grid>
                                    <input type='hidden' {...register("status", setValue("status", progress))} />
                                </Grid>
                            </Grid>
                        </div>
                        <Grid>
                            <input type='hidden' {...register("signed", setValue("signed", signed))} />
                        </Grid>
                        {/* <Grid className="form-control agitator last-row">
                            <input type="submit" class= { submitBtt_Disable ? "submit-btt-disable" : "btn btn-primary"}/>
                        </Grid> */}
                    </Grid>
                </Grid> 
            </form>
            <div  className="form-control agitator last-row">
                <Button variant="primary" type='submit' form='submit-form' className= { submitBtt_Disable ? "submit-btt-disable" : "btt-enable"}>CREATE NEW
                </Button>
                <Button  variant="info"  className='refresh' style={{backgroundColor: 'white'}} onClick={handleRefresh}>Refreshing</Button>
            </div>
           
        </div>
        </>
    )
}
