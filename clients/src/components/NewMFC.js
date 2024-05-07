import React, { useState, useEffect } from 'react';
import  { useForm } from 'react-hook-form';
import '../Form.css'
// import axios from "axios";
//import AddNewIcon from '../Utils/Icons'
import AddNewIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Header from './Header'
import {Grid} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import http from '../api/http-common'

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [custNames, setCustNames] = useState([]);
    const [name, setName] = useState("")
    // const [columns, setColumns] = useState([])   
    const history = useHistory();
    
    const CustomerNames = custNames.map(custName => custName)

    useEffect(() => {
        //document.title = 'Mass Flow Control Registry';
        /* (async () => {
        await axios("http://localhost:8080/api/customers") */
        http.get("/customers")
        .then((res) => {
            const customers = res.data.customers;
            const data =customers.map(item => { return item.name });
            console.log("data: ", data);
            setCustNames(data)
        })
    }, []);

    const onSubmit = data => {
        data.Customer = name
        console.log("submit data: ", data);
    }
    console.log(errors);
    
    const handleClick=(e) =>{
        console.log("you clicked ME!!!: ", e.target.value)
        setName(e.target.value)
    }

    const handleCustNameChange =(e) => { 
        console.clear(); 
        console.log("You changed ME!!!: ", custNames[e.target.value])
    /*    console.log((addrtype[e.target.value])); 
        setRole(addrtype[e.target.value])  */
    }

    const handleClick_AddNewCustomer = ()=>{
        history.push('/newcust')
        // history.push('/neworder')
    }

    return (
        <>
        <Header name="Mass Flow Control Registry" />
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container xs="12" spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={2} className="form-control">
                        <label>SN</label>
                    </Grid>    
                    <Grid item xs={8}  className="form-control">
                        <input type="text" {...register("SN", {required: true, maxLength: 20})} />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}  className="form-control">
                        <label>Model</label>
                    </Grid>
                    <Grid item xs={8}  className="form-control">    
                        <input type="text" {...register("Model", {required: true, maxLength: 100})} />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Grid container xs={12}>    
                    <Grid item  xs={2} sm={2} className="form-control">
                        <label>Customer</label>
                    </Grid>
                    <Grid item xs={4}  className="form-control">    
                        < select 
                            onClick={handleClick}
                            onChange={e => handleCustNameChange(e)}
                        >
                            { CustomerNames.map((custName, key) => <option key={key} value={custName}>{custName} </option>) }
                        </select >
                    </Grid>   
                    <Grid item xs={1}>
                            {/* Need TO DO!!!! BY ROUTING THE LINK TO OPEN NEW CUSTOMER PAGE */}
                            <AddNewIcon fontSize="large" onClick={handleClick_AddNewCustomer} />
                    </Grid>
                </Grid>  
                <Grid item xs={6} className="form-control" style={{ marginTop: 30}}>
                    <input type="submit" />
                </Grid>
                 
                </form>
            
        </div>
        </>
    )
}

