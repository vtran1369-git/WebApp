import React, { useState } from 'react';
import  { useForm } from 'react-hook-form';
// import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'
import CustomerService from '../api/CustomerService'

export default function App() {
    const initialCustomerState = {
        name: "",
        address: "",
        city: "",
        state: "",
        zipcode: null,
        phone_num: "",
        fax_num: ""
    }

    const [ customer, setCustomer ] = useState(initialCustomerState)
    const [ submitted, setSubmitted ] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    console.log(errors);

    const onSubmit = customer => {
        console.log("submit customer: ", customer);
        setCustomer(customer); //do we need to ?
        CustomerService.create(customer)
            .then(res => {
                setSubmitted(true);
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    const newCustomer = () => {
        //setCustomer(initialCustomerState);
        setSubmitted(false);
        reset()
    }

    return (
        <>
       
        <div className="form-container customer">
            <Header name="Add New Customer" />
            {submitted ? (
                <>
                <div>
                    <h4>You submitted successfully!</h4>
                </div>
                <button className="btn btn-success" onClick={newCustomer}>
                    Add
                </button>
                </>
            ):(
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container xs={12} spacing="1" direction="row" justify="flex-start">
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>Customer Name</label>
                        </Grid>
                        <Grid item xs={8} sn={8} className="form-control">    
                            <input type="text"   // name="cust_name"
                                autoComplete="off"
                                {...register("name", {required: "Required"})}
                            />
                            {errors.name && errors.name.message}
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>Address</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">
                            <input type="text" {...register("address", {required: "Required"})} />
                            {errors.address && errors.address.message}
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>City</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="text" {...register("city", {required:"Required"})} />
                            {errors.city && errors.city.message}
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>State</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="text" {...register("state", {required: "Required"})} />
                            {errors.state && errors.state.message}
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>Zip Code</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="text" {...register("zipcode", {required: false})} />
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>Phone Number</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="text" {...register("Phone_num", {required: false})} />
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4} className="form-control">
                            <label>Fax Number</label>
                        </Grid>
                        <Grid item xs={8} className="form-control">    
                            <input type="text" {...register("Fax_num", {required: false})} />
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8} className="form-control"><input type="submit" /></Grid>
                    </Grid>    
                </Grid>
            </form>
            )
            }
        </div>
        </>
    )
}

