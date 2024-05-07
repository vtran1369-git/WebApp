import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import  { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'
import MfcService from '../api/MfcService'

export default function App(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mfc, setMfc] = useState([]);
    const [addresses, setAddresses] = useState([])
    const [ submitted, setSubmitted ] = useState(false)

    const onSubmit = data => {
        console.log("submit Mfc: ", data);
        setMfc(data); 
        MfcService.create(mfc)
            .then(res => {
                setSubmitted(true);
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    const newMfc = () => {
        setSubmitted(false);
        reset()
    }
    
    let headerName = null
    try {
        console.log(">>>props passed: ", props.location.state.id)
        headerName = "Mass Flow Control"
    } catch (err) {
        console.log(err)
        headerName = "New Mass Flow Control Registry"
    }
    
    useEffect(() => {
        //console.log(">>>newmfc_reg called")
        //console.log(">>>props passed: ", this.props.location.state.id)
        http.get("/addresses")
        .then((res) => {
            const addr_rtn = res.data.addresses;
            const data =addr_rtn.map(item => { 
                const obj = {};
                obj.id = item.id_addresses;
                obj.name = item.name;
                return obj;
            });
            //console.log("addresses: ", data);
            setAddresses(data)
        })
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
                    <button className="btn btn-success" onClick={newMfc}>
                        Add
                    </button>
                    </>
                    ):(
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <Header name="Add New MFC" /> */}
                        <Header name = {headerName} />
                        <Grid container xs="12" spacing={3} direction="row" justify="flex-center" alignItems="flex-center">
                            <Grid item xs={6} className="form-control">
                                <label>Serial Number</label>
                                <input type="text" {...register("sn", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6} className="form-control">
                                <label>Model</label>
                                <input type="text" {...register("model", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6} className="form-control">
                                <label>DevID</label>
                                <input type="text" {...register("Mfcdevid", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6}  className="form-control">    
                                <label>Manufacture</label>
                                <select {...register("idmfr", {required: true})}>
                                    { 
                                        addresses.map((addr, key) => <option key={key} value={addr.id}>{addr.name}</option>) 
                                    }
                                </select >
                            </Grid>   
                            <Grid item xs={6} className="form-control">
                                <label>Date Added</label>
                                <input type="text" {...register("addedDt", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6} className="form-control">
                                <label>Last Cal Date</label>
                                <input type="text" {...register("lastCalDate", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6} className="form-control">
                                <label>Cal Due Date</label>
                                <input type="text" {...register("calDueDate", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6} className="form-control">
                                <label>Status</label>
                                <input type="text" {...register("status", {required: true, maxLength: 20})} />
                            </Grid>
                            <Grid item xs={6} className="form-control" style={{ marginTop: 30}}>
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

