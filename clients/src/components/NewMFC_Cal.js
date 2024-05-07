import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import  { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import MfcCalService from '../api/MfcCalService'

export default function App(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mfccal, setMfccal] = useState([]);
    const [wo, setWo] = useState([])
    const [ submitted, setSubmitted ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)
    const headerRedirect = "MFC Calibration Registry";
    const headerNew = "New MFC Calibration Registry";

    const onSubmit = data => {
        console.log("submit Mfc: ", data);
        setMfccal(data); 
        MfcCalService.create(mfccal)
            .then(res => {
                setSubmitted(true);
                console.log(res.data)
            })
            .catch(e => {
                console.log(">>>> error: " ,e);
            });
    }
    
    const newMfcCal = () => {
        setSubmitted(false);
        reset()
    }
    
    console.log(">>>errors: ", errors)
    useEffect(() => {
        http.get("/workorder/all")
        .then((res) => {
            const rtn = res.data.work_orders;
            //console.log(">>rtn: ", rtn);
            const data =rtn.map(item => { 
                return item["WO Number"];
            });
            //console.log("addresses: ", data);
            setWo(data)
        });

        try {
            let paraId = props.location.state.id
            console.log(">>>props passed: ",paraId)
            paraId? setRedirect(true):setRedirect(false);
            http.get("/mfccal/" + paraId)
            .then((res) => {
                const data = res.data.mfc_cal;
                //console.log(">>>mfccal response: ", data)
                setMfccal(data)
                //console.log("mfccal: ", mfccal)
            })
        } catch (err) {
            console.log(err)
        }
    }, []);

    return (
        <>
            {/* <Header name="Add New MFC" /> */}
            
            <div className="form-container">
                {   submitted ? (
                    <>
                    <div>
                        <h4>You submitted successfully!</h4>
                    </div>
                    <button className="btn btn-success" onClick={newMfcCal}>
                        Add
                    </button>
                    </>
                    ):(
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <Header name="Add New MFC" /> */}
                        <Header name = {redirect? headerRedirect: headerNew} />
                        <Grid container xs="12" spacing={3} direction="row" justify="flex-center" alignItems="flex-center">
                            <Grid container xs="12" spacing="3" className="mfccal-headinfo">
                                <Grid item xs={3} className="form-control">
                                    <label>Operator</label>
                                    <input type="text" defaultValue={mfccal.operator}{...register("op")} />
                                </Grid>
                                <Grid item xs={3} className="form-control">
                                    <label>Station</label>
                                    <input type="text" defaultValue={mfccal.station} {...register("station")} />
                                </Grid>
                                <Grid item xs={3} className="form-control">
                                    <label>Cal Date</label>
                                    <input type="text" defaultValue={mfccal.calDTG} {...register("caldt")} />
                                </Grid>
                                <Grid item xs={3}  className="form-control">    
                                    <label>Work Order</label>
                                    <select {...register("wo")}>
                                        { 
                                            wo.map((item, key) => <option key={key} value={item}>{item}</option>) 
                                        }
                                    </select >
                                </Grid>   
                            </Grid>
                            <Grid container xs="12" spacing="3" className="mfccal-noedit">
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
                            </Grid>
                            <Grid container xs="12" spacing="3" className="mfccal-noedit">
                                <Grid item xs={4} className="form-control">
                                    <label>Flow Range</label>
                                    <input type="text" value={mfccal.flowrange} {...register("flowrange")} />
                                </Grid>
                                <Grid item xs={4} className="form-control">
                                    <label>Test Gas</label>
                                    <input type="text" defaultValue={mfccal.testgas} {...register("testgas")} />
                                </Grid>
                                <Grid item xs={4} className="form-control">
                                    <label>Process Gas</label>
                                    <input type="text" defaultValue={mfccal.procgas} {...register("procgas")} />
                                </Grid>
                            </Grid>
                            <Grid container xs="12" spacing="3" className="mfccal-edit">
                                <Grid item xs={4} className="form-control">
                                    <label>Pressure(psi)</label>
                                    <input type="text" value={mfccal.psi} {...register("psi")} />
                                </Grid>
                                <Grid item xs={4} className="form-control">
                                    <label>DUT Address</label>
                                    <input type="text" defaultValue={mfccal.dutaddress} {...register("dutaddress")} />
                                </Grid>
                                <Grid item xs={4} className="form-control">
                                    <label>DUT Range</label>
                                    <input type="text" value={mfccal.dutoutrange} {...register("dutoutrange")} />
                                </Grid>
                            </Grid>  
                            <Grid container xs="12" spacing="3" className="mfccal-edit">  
                                <Grid item xs={4} className="form-control">
                                    <label>K-Factor</label>
                                    <input type="text" defaultValue={mfccal.kfactor} {...register("kfactor")} />
                                </Grid>
                                <Grid item xs={4} className="form-control">
                                    <label>DUT Tolerance</label>
                                    <input type="text" value={mfccal.duttolerance} {...register("duttolerance")} />
                                </Grid>
                                <Grid item xs={4} className="form-control">
                                    <label>As Found/Left</label>
                                    <select {...register("asfoundleft")}>
                                        {
                                            ["LEFT", "FOUND", "FOUND LEFT"].map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))
                                        }
                                    </select>
                                    {/* <select {...register("asfoundleft")}>
                                        <option default value="LEFT">LEFT</option>
                                        <option value="FOUND">FOUND</option>
                                        <option value="FOUND LEFT">FOUND LEFT</option>
                                    </select> */}
                                </Grid>
                            </Grid>
                            <Grid item xs={4} className="form-control" style={{ marginTop: 30}}>
                                <input type="submit" />
                            </Grid>
                        </Grid> 
                    </form>
                    )
                }
            </div>
        </>
    )
}

