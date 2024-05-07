import React, { useState, useEffect, useRef } from 'react';
import "react-datepicker/dist/react-datepicker.css"
// import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import  { useForm } from 'react-hook-form';
import Modal  from './Modal'
import AGITATOR from '../api/AgitatorService'
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom'
import PeopleService from '../api/PeopleService';
import ConvertBlobToImage from './ConvertBlobToImage'
import PrintPage from './PrintPage'


export default function App() {
    const { register, handleSubmit, setValue, reset } = useForm()
    const [opID, setOpID] = useState(null)
    const [opDate, setOpDate] = useState(null)
    const [qaID, setQAID] = useState(null)
    const [qaDate, setQADate] = useState(null)
    const [finalQAID, setFinalQAID] = useState(null)
    const [finalQADate, setFinalQADate] = useState(null)
   
    const [signedOpImage, setSignedOpImage] = useState(null)
    const [signedQAImage, setSignedQAImage] = useState(null)
    const [signedFinalQAImage, setSignedFinalQAImage] = useState(null)
    const [signedEditorImage, setsignedEditorImage] = useState(null)
    const [editorDate, setEditorDate] = useState(null)
    const [editorID, setEditorID] = useState(null)
    const [progress, setProgress] = useState(null)
    const [signed, setSigned] = useState(null)
    const divPrint = useRef(null)
 
    const [submitBtt_Disable, setSubmitBtt_Disable] = useState(false)
    
    const location = useLocation()
    // console.log("location.state: ", location.state)
    const retrievedData = location.state.agitator_data

    const [formData, setFormData] = useState(
        {   
            idagitator_etraveler: retrievedData.idagitator_etraveler,
            serial_num: retrievedData.serial_num,
            wo_num: retrievedData.wo_num,
            model_num: retrievedData.model_num,
            model_rev: retrievedData.model_rev,
            po_num: retrievedData.po_num,
            customer: retrievedData.customer,
            motor_name: retrievedData.motor_name,
            motor_sn: retrievedData.motor_sn,
            motor_turn_cw_ccw: retrievedData.motor_turn_cw_ccw,
            run_entire_range: retrievedData.run_entire_range,
            prod_sn_labels_attached: retrievedData.prod_sn_labels_attached,
            supplier_name: retrievedData.supplier_name,
            tech_name: retrievedData.tech_name,
            tech_date: retrievedData.tech_date,
            opID: retrievedData.opID,
            opDate: retrievedData.opDate,
            qaID: retrievedData.qaID,
            qaDate: retrievedData.qaDate,
            finalQAID: retrievedData.finalQAID,
            finalQADate: retrievedData.finalQADate,
            editorID: retrievedData.editorID,
            editorDate: retrievedData.editorDate,
            comments: retrievedData.comments,
            status: retrievedData.status,
            signed: retrievedData.signed
        }
    )
   
    useEffect(()=>{
        console.log("Agitator.js RUNNING ..EFFECT")
        console.log("Property data: ", retrievedData)
         
        if(retrievedData.opID!== null){
            PeopleService.getById(retrievedData.opID)
            .then( (result) => {
                console.log("people retrievedData return: ", result.data.data[0])
                let person = result.data.data[0]
                let signVal = person.signature
                if( signVal !== null ){
                    setSignedOpImage(ConvertBlobToImage(signVal))
                }
            },
            (error)=>{ console.log("error ", error)}
            );
        }

        if(retrievedData.qaID!== null){
            // setSubmitBtt_Disable(true)
            PeopleService.getById(retrievedData.qaID)
            .then( (result) => {
                console.log("people retrievedData return: ", result.data.data[0])
                let person = result.data.data[0]
                let signVal = person.signature
                if( signVal !== null ){
                    setSignedQAImage(ConvertBlobToImage(signVal))
                }
            },
            (error)=>{ console.log("error ", error)}
            );
        }

        if(retrievedData.finalQAID!== null){ 
            // setSubmitBtt_Disable(true)
            PeopleService.getById(retrievedData.finalQAID)
            .then( (result) => {
                console.log("people retrievedData return: ", result.data.data[0])
                let person = result.data.data[0]
                let signVal = person.signature
                if( signVal !== null ){
                    setSignedFinalQAImage(ConvertBlobToImage(signVal))
                }
            },
            (error)=>{ console.log("error ", error)}
            );
        
        }
        
        if(retrievedData.editorID !== null) {
            PeopleService.getById(retrievedData.editorID)
            .then( (result) => {
                console.log("people retrievedData return: ", result.data.data[0])
                let person = result.data.data[0]
                let signVal = person.signature
                if( signVal !== null ){
                    setsignedEditorImage(ConvertBlobToImage(signVal))
                }
            },
            (error)=>{ console.log("error ", error)}
            );
        }
        setOpDate(retrievedData.opDate)
        setQADate(retrievedData.qaDate)
        setFinalQADate(retrievedData.finalQADate)
        setEditorDate(retrievedData.editorDate)
        setOpID(retrievedData.opID)
        setQAID(retrievedData.qaID)
        setFinalQAID(retrievedData.finalQAID)
        setEditorID(retrievedData.editorID)
        setProgress(retrievedData.status)
      
        console.log("formdata: ", formData)
        setSigned(retrievedData.signed)
    }, []) /*[qaDate, finalQADate]) */
  
    const handleChangeSelection = (event) => {
        // event.preventDefault()
        // console.log("handleChangeSelection event:")
        let inputName = event.target.name
        setFormData({...formData, [inputName]: event.target.value})
        // console.log("key: ", event.target)
    }

    const onSubmit = (data) => { 
        /* console.log("performID(opID): ", retrievedData.opID)
        console.log("Revised ID: ", retrievedData.editorID) */
        setFormData({...formData, qaID: data.qaID, qaDate: data.qaDate})
        // setSubmitBtt_Disable(true)
        console.log("submit data: ")
        console.log(data)
        // console.log("data after signed added: ", data)
        console.log("formdata: ", formData)
        // console.log("agittorID: ", formData.idagitator_etraveler)
        if(retrievedData.opID!= null && retrievedData.editorID === null){
            //eTraveler has been edited,therefore need to create a new record for tracking what changes
            data.status = "Edited"
            console.log("data after overide status as 'edited': ", data)
            AGITATOR.create(data)
            .then( res => {
                console.log("server responding: ")
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            });
        }else{
            AGITATOR.update(data.idagitator_etraveler, data)
            .then( res => {
                console.log("server responding: ")
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            });
        }
    }

    const handleRefresh = (e) => {
      window.location.reload()
    }

    return (
        <>
        <div>
            <div ref={divPrint} className="form-container agitator">
                <style type="text/css" media="print">
                    {" @page { size: landscape; } "}
                </style>
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
                            <input type='hidden' {...register("idagitator_etraveler", setValue("idagitator_etraveler", formData.idagitator_etraveler))} />
                            <label>Serial Number</label>   
                            <input type="text" {...register("serial_num", setValue("serial_num", formData.serial_num), {required: false, maxLength: 30})} />
                          </Grid>
                        <Grid  className="form-control agitator"> 
                            <label>Work Order Number</label>   
                            <input type="text" placeholder='Work Order Number' {...register("wo_num", setValue("wo_num", formData.wo_num) , {required: false, maxLength: 30})} onChange={handleChangeSelection} />
                        </Grid>
                        <Grid className="form-control agitator last-row">   
                                <label>Technician</label>
                                <input type="text" {...register("tech_name", setValue("tech_name", formData.tech_name), {required: false, maxLength: 20})} />
                                <label1>Date</label1>
                                <input type='date'  {...register("tech_date", setValue("tech_date", formData.tech_date))} />
                        </Grid>
                        <Grid  className="form-control agitator"> 
                            <label>Model Number</label>   
                            <input type="text" {...register("model_num", setValue("model_num", formData.model_num) , {required: false, maxLength: 30})} onChange={handleChangeSelection}/>
                            <label1>Rev.</label1>   
                            <input type="text" style={{width: '50px', textAlign: 'center'}} {...register("model_rev", setValue("model_rev", formData.model_rev) , {required: false, maxLength: 1})} onChange={handleChangeSelection} />
                        </Grid>
                        <Grid  className="form-control agitator last-row"> 
                            <label>PO Number</label>   
                            <input type="text" {...register("po_num", setValue("po_num", formData.po_num) , {required: false, maxLength: 30})} onChange={handleChangeSelection} />
                            <label1>Customer</label1>   
                            <input type="text" {...register("customer", setValue("customer", formData.customer), {required: false, maxLength: 30})} onChange={handleChangeSelection}/>
                        </Grid>
                        <Grid container className="form-container motor" xs="12" spacing={2} direction="row" justify="flex-center" alignItems="flex-center" >
                            <Grid container className='checkbox'>
                                <Grid item xs= {6} className='headline-motor'>Agitator Motor (checkone)</Grid>
                                <Grid item xs= {2} className='headline-motor'>Motor SN</Grid>
                                <Grid item xs= {2} className='headline-motor'>Motor Turn CW & CCW?</Grid>
                                <Grid item xs= {2} className='headline-motor'>Run Entire Range?</Grid>
                                
                                <Grid item xs= {2} className='headline-motor'>
                                    <input className="radio" type='radio' {...register("motor_name")} value="KollMorgen" checked={formData.motor_name === "Kollmorgen"} onChange={handleChangeSelection}/> 
                                    {/* <input className="radio" type='radio' {...register("motor_name", setValue("motor_name", "Kollmorgen"))} checked={formData.motor_name === "Kollmorgen" ? true: false} onChange={handleChangeSelection}/> */}
                                      <label for="kollmorgen">KollMorgen</label> 
                                </Grid>
                                <Grid item xs= {2} className='headline-motor'>
                                    <input className="radio" type='radio' {...register("motor_name")} value="Maxon" checked={formData.motor_name === "Maxon"} onChange={handleChangeSelection}/>
                                    {/* <input className="radio" type='radio' {...register("motor_name", setValue("motor_name", "Maxon"))} checked={formData.motor_name === "Maxon" ? true : false} onChange={handleChangeSelection}/> */}
                                     <label for="Maxon">Maxon</label> 
                                </Grid>
                                <Grid item xs= {2} className='headline-motor'>
                                    <input className="radio" type='radio' {...register("motor_name")} value="Teknic" checked={formData.motor_name === "Teknic"} onChange={handleChangeSelection}/>
                                    {/* <input className="radio" type='radio' {...register("motor_name", setValue("motor_name", "Teknic"))} checked={formData.motor_name === "Teknic" ? true : false} onChange={handleChangeSelection}/> */}
                                     <label for="Teknic">Teknic</label> 
                                </Grid>
                            
                                <Grid item xs= {2} className='headline-motor'>
                                    <input type='text' placeholder='Motor SN' {...register("motor_sn", setValue("motor_sn", formData.motor_sn))} onChange={handleChangeSelection}/>
                                </Grid>
                                <Grid item xs= {2} className='headline-motor'>
                                    <input className="radio" type='radio' {...register("motor_turn_cw_ccw")} value="yes" checked={formData.motor_turn_cw_ccw === "yes"} onChange={handleChangeSelection}/>
                                    <label for="CW">Yes</label>
                                    <input className="radio" type='radio' {...register("motor_turn_cw_ccw")} value="no" checked={formData.motor_turn_cw_ccw === "no"} onChange={handleChangeSelection}/>
                                    {/* <input className="radio" type='radio' {...register("motor_turn_cw_ccw", setValue("motor_turn_cw_ccw", "no"))}  checked={formData.motor_turn_cw_ccw === "no" ? true : false} onChange={handleChangeSelection}/> */}
                                    <label for="ccw">No</label> 
                                </Grid>
                                <Grid item xs= {2} className='headline-motor'>
                                    <input className="radio" type='radio' {...register("run_entire_range")} defaultValue="yes" checked={formData.run_entire_range === "yes" ? true : false} onChange={handleChangeSelection} />
                                    <lable for="run_entire_range">Yes</lable>
                                    <input className="radio" type='radio' {...register("run_entire_range")} defaultValue="no" checked={formData.run_entire_range === "no" ? true : false} onChange={handleChangeSelection}/>
                                    <lable for="run_entire_range">No</lable>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} className='form-control agitator'> */}
                                <Grid item={9} className='label_attached'>
                                    Is the Product and Serial Number Label attached to the Agitator Motor:
                                </Grid> 
                                <Grid item={3}>
                                    <input className="radio" type='radio' {...register("prod_sn_labels_attached")} defaultValue="yes" checked={formData.prod_sn_labels_attached === "yes" ? true : false} onChange={handleChangeSelection}/>
                                    <lable for="prodsnLabel">Yes</lable>
                                    <input className="radio" type='radio' {...register("prod_sn_labels_attached")} defaultValue="no" checked={formData.prod_sn_labels_attached === "no" ? true : false} onChange={handleChangeSelection}/>
                                    <lable for="prodsnLabel">No</lable>
                                </Grid>
                            {/* </Grid> */}
                            <Grid  item xs={12} className="form-control agitator"> 
                                <label>Supplier Name</label>   
                                <input type="text" placeholder='Supplier name' {...register("supplier_name", setValue("supplier_name", formData.supplier_name))} onChange={handleChangeSelection} />
                            </Grid>
                            <Grid item xs="12"className='form-control agitator' style={{display: "flex"}} >
                                <Grid item={2}>
                                    <label>Performed By</label>
                                </Grid>
                                <Grid item xs={3} name='qa'>
                                    {
                                        signedOpImage === null ? (<Modal edited="no" role="Tech" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setOpID} setDateFunct={setOpDate}/>)
                                        : (<img src={signedOpImage} alt=''></img>)
                                    }
                                    <input type='hidden' {...register("opID", {value: {opID}.opID})} onChange={handleChangeSelection}/>
                                </Grid>
                                <Grid item={3} className='sign-date' style={{display:"flex", flexDirection: "row", alignItems: "center"}} >
                                    <label>Date</label>
                                    {/* <textarea {...register("opDate", setValue("opDate",opDate))} /> */}
                                    <input type='date'  {...register("opDate", setValue("opDate",opDate))} onChange={handleChangeSelection}/> 
                                </Grid>
                            </Grid>
                            <Grid className="form-control agitator">
                                <p>QA Reviewed this Traveler and Product Under Test for conformance to specifications provided.</p>
                            </Grid>
                            {/* <Grid className="form-control agitator last-row">    */}
                            <Grid item xs="12"className='form-control agitator' style={{display: "flex"}} >
                                <Grid item={2}>
                                    <label>QA Reviewed By</label>
                                </Grid>
                                <Grid item xs={3} name='qa'>
                                    { 
                                        signedQAImage === null ? (<Modal edited="no" role="QA" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setQAID} setDateFunct={setQADate}/>)
                                        : (<img src={signedQAImage} alt=''></img>)
                                    }
                                    {/* <input type='hidden' {...register("qaID", setValue("qaID", qaID))} onChange={handleChangeSelection} /> */}
                                    <input type='hidden' {...register("qaID", {value: {qaID}.qaID})} onChange={handleChangeSelection}/>
                                </Grid>
                                <Grid item={3} className='sign-date' style={{display:"flex", flexDirection: "row", alignItems: "center"}} >
                                    <label>Date</label>
                                    <input type='date'  {...register("qaDate", setValue("qaDate", qaDate))} onChange={handleChangeSelection} />
                                    {/* <input type='date'  {...register("qaDate", {value: {qaDate}.qaDate})} onChange={handleChangeSelection} /> */}
                                </Grid>
                            </Grid>
                            <Grid item xs="12"className='form-control agitator' style={{display: "flex"}} >
                                <Grid item={2}>
                                    <label>Final QA Reviewed By</label>
                                </Grid>
                                <Grid item xs={3} name='qa'>
                                    { 
                                        signedFinalQAImage === null ? (<Modal edited="no" role="FinalQA" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setFinalQAID} setDateFunct={setFinalQADate}/>)
                                        : (<img src={signedFinalQAImage} alt=''></img>)
                                    }
                                    <input type='hidden' {...register("finalQAID", setValue("finalQAID",finalQAID))} />
                                    {/* <input type='hidden' {...register("finalQAID", {value: {finalQAID}.finalQAID})} /> */}
                                </Grid>
                                <Grid item={3} className='sign-date' style={{display:"flex", flexDirection: "row", alignItems: "center"}} >
                                    <label>Date</label>
                                    <input type='date' {...register("finalQADate", setValue("finalQADate", finalQADate))} />
                                </Grid>
                            </Grid>
                            {console.log("progress: ", progress)}
                            {/* <Grid item xs="12" className= { progress === "New" ? 'form-control agitator visible' : 'form-control agitator hidden'} style={{display: "flex"}} > */}
                            <Grid item xs="12" className="form-control agitator" style={{display: "flex"}} >
                                <Grid item={2}>
                                    <label>Revised By</label>
                                </Grid>
                                <Grid item xs={3} name='qa'>
                                    { 
                                        signedEditorImage === null ? (<Modal edited="yes" role="Tech" signed= {signed} setSigned={setSigned} funct2={setProgress} funct={setEditorID} setDateFunct={setEditorDate}/>)
                                        : (<img src={signedEditorImage} alt=''></img>)
                                    }
                                    <input type='hidden' {...register("editorID", setValue("editorID", editorID))} />
                                </Grid>
                                <Grid item={3} className='sign-date'  >
                                    <label>Date</label>
                                    <input type='date'  {...register("editorDate", setValue("editorDate",editorDate))} />
                                </Grid>
                                <Grid item={4} style={{display:"flex", flexDirection: "row", marginLeft: "15px"}}>
                                    <label style={{width: "100px"}}>Comments</label>
                                    <textarea style={{ width: 'fit-content'}} {...register("comments", setValue("comments", formData.comments))}></textarea>
                                </Grid>
                                <Grid>
                                    <input type='hidden' {...register("status", setValue("status", progress))} />
                                </Grid>
                                <Grid>
                                    <input type='hidden' {...register("signed", setValue("signed", signed))} />
                                </Grid>
                            </Grid>
                            {/* <Grid className="form-control agitator last-row">
                                <input type="submit" class= { submitBtt_Disable ? "submit-btt-disable" : "btn btn-primary"}/>
                            </Grid> */}
                        </Grid>
                    </Grid> 
                </form>
                
            </div>
            <Grid container xs={12} spacing="0" direction="row" justify="flex-start" style={{paddingTop: '15px'}}>
                <Grid item xs={2}>
                    <Button variant="primary" type='submit' form='submit-form' className= { submitBtt_Disable ? "submit-btt-disable" : "btt-enable"}>
                        Submit Changes
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <PrintPage pageName="PRINT" divRef = {divPrint} />
                </Grid>
                {/* <Button  variant="info"  className='refresh' style={{backgroundColor: 'white'}} onClick={handleRefresh}>Refreshing</Button> */}
            </Grid>
        </div>
        </>
    )
}
