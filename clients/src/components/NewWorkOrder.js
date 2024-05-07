import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import  { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css"
// import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import http from '../api/http-common'

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [custNames, setCustNames] = useState([]);
    const CustomerNames = custNames.map(custName => custName)

    const onSubmit = data => {
        data.reqDate = reqDate;
        console.log("submit data: ", data);
    }

    console.log(errors);
    const [ reqDate, setReqDate ] = useState("");
    
    useEffect(() => {
        http.get("/customers")
        .then((res) => {
            const customers = res.data.customers;
            const data =customers.map(item => { 
            const obj = {};
            obj.id = item.id_customer;
            obj.name = item.name;
            return obj;
        } );
        setCustNames(data);
        })
    }, [])

    return (
        <>
        
        <div className="form-container wo">
            <Header name="New Work Order Registry" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container xs={12} spacing="1" direction="row" justify="flex-start">
                    {/* <Grid container xs={12}> */}
                        <Grid item xs={4} className="form-control">
                            <label>Work Order</label>
                        </Grid>
                        <Grid item xs={8} sn={8} className="form-control">    
                            <input type="text" {...register("Work Order", {required: true, maxLength: 20})} />
                        </Grid>
                    {/* </Grid> */}
                    {/* <Grid container xs={12}> */}
                        <Grid item xs={4} className="form-control">
                            <label>Part Number</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">
                            <input type="text" {...register("Part Number", {required: true, maxLength: 100})} />
                        </Grid>
                    {/* </Grid> */}
                        <Grid item  xs={4} className="form-control">
                            <label>Customer</label>
                        </Grid>
                        <Grid item xs={8}  className="form-control">    
                            < select 
                                /* onClick={handleClick}
                                onChange={e => handleCustNameChange(e)} */
                            >
                                { CustomerNames.map((custName, key) => <option key={key} value={custName.id}>{custName.name}</option>) }
                            </select >
                        </Grid>   
                    {/* <Grid container xs={12}> */}
                        <Grid item xs={4} className="form-control">
                            <label>Quantity</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="number" {...register("Quantiy", {required: true, min: 1})} />
                        </Grid>
                    {/* </Grid> */}
                    {/* <Grid container xs={12}> */}
                        <Grid item xs={4} className="form-control">
                            <label>Required Date</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <ReactDatePicker
                                selected = {reqDate}
                                dateFormat="MM/dd/yyyy"
                                onChange = { reqDate => setReqDate(reqDate) }
                            />
                        </Grid>
                    {/* </Grid> */}
                    {/* <Grid container xs={12}> */}
                        <Grid item xs={4} className="form-control">
                            <label>Status</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="text" {...register("Status", {required: true})} />
                        </Grid>
                    {/* </Grid> */}
                    {/* <Grid container xs={12}>     */}
                        <Grid item xs={4} className="form-control">
                            <label>Instructions</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <textarea rows={5} type="text" {...register} />
                        </Grid>  
                    {/* </Grid>  */}
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control"></Grid>
                        <Grid item xs={8} className="form-control"><input type="submit" /></Grid>
                    </Grid>
                    
                </Grid>
            </form>
        </div>
        </>
    )
}

