import React, { useState, useEffect } from 'react';
import  { useForm } from 'react-hook-form';
import '../Form.css'
import axios from "axios";
//import AddNewIcon from '../Utils/Icons'
import AddNewIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Header from './Header'

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [custNames, setCustNames] = useState([]);
    const [name, setName] = useState("")
    const [columns, setColumns] = useState([])   

    const CustomerNames = custNames.map(custName => custName)

    useEffect(() => {
        document.title = 'Mass Flow Control Registry';
        (async () => {
        await axios("http://localhost:8080/api/customers/all")
        .then((res) => {
            const customers = res.data.customers;
            const data =customers.map(item => { return item.name });
            console.log("data: ", data);
            setCustNames(data)
        })
        })();
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

    const handleClickAddName = ()=>{
        console.log("You clicked on ADD NEW NAME!!!")
    }

    return (
        <>
        <Header name="MASS FLOW CONTROL REGISTRY" />
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Serial Number</label>
                    <input type="text" {...register("SN", {required: true, maxLength: 20})} />
                </div>
                <div className="form-control">
                    <label>Model</label>
                    <input type="text" {...register("Model", {required: true, maxLength: 100})} />
                </div>
                <div className='inrow'>
                    <div className="form-control">
                        <label>Customer</label>
                        < select 
                            onClick={handleClick}
                            onChange={e => handleCustNameChange(e)}
                        >
                            { CustomerNames.map((custName, key) => <option key={key} value={custName}>{custName} </option>) }
                        </select >
                    </div>
                    <div className="newicon">
                        {/* Need TO DO!!!! BY ROUTING THE LINK TO OPEN NEW CUSTOMER PAGE */}
                        <AddNewIcon fontSize="large" onClick={() => window.open('https://www.yahoo.com', "_blank")} />
                        {/* <AddNewIcon fontSize="large" onClick={() => window.location.replace('https://www.yahoo.com')} />  */}
                    </div>
                </div>
               
                <div className="form-control" style={{ marginTop: 30}}><input type="submit" /></div>
            </form>
        </div>
        </>
    )
}

