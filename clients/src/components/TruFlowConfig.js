import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import  { set, useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css"
import '../Form.css'
import Header from './Header'
import {Grid} from '@material-ui/core'




export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [custNames, setCustNames] = useState([]);

    const [vhf_sel, setVHF] = useState("")
    const [configPN, setConfigPN] = useState("")
    const [material, setMaterial] = useState("")
    const [mfcInput, setMFCinput] = useState("")
    const [mfcOutput, setMFCoutput] = useState("")
    const [mfc1, setMFC1] = useState("")
    const [mfc2, setMFC2] = useState("")
    const [mfc3, setMFC3] = useState("")
    const [mfc4, setMFC4] = useState("")
    const [mfc5, setMFC5] = useState("")
    const [mfc6, setMFC6] = useState("")
    const [cfg, setCFG] = useState("")
    const [input, setInput] = useState(
        { material: "", vhf: "", mfcIN: "", mfcOUT: "", controlType: "", mfc1: "", mfc2: "", mfc3: "", mfc4: "", mfc5: "", mfc6: "" }
    )

    const handleChange = e => {
        const {name, value} = e.target;
        console.log("name-value", name, "and ", value)
        setInput( prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log("input: ", input)
    }

    const onSubmit = (data)=> {
        console.log("submit data: ", data);
        const VHF = data.vhf_selected === "None" ? "" : "-VHF"
        const controlType = VHF === "" ? "" : ("-" + data.controlType)
        const gas4 = data.gas4 !=="" && data.gas4 !== "000" ? ("-"+ data.gas4) : "-000" 
        const gas5 = data.gas5 !== "" && data.gas5 !== "000" ? ("-"+ data.gas5) : "-000" 
        const gas6 = data.gas6 !== "" && data.gas6 !== "000" ? ("-"+ data.gas6) : "-000" 
       
        const subGas1 = parseInt(data.gas1.slice(1))
        const subGas2 = parseInt(data.gas2.slice(1))
        const subGas3 = parseInt(data.gas3.slice(1))
        const subGas4 = parseInt(data.gas4.slice(1))
        const subGas5 = parseInt(data.gas5.slice(1))
        const subGas6 = parseInt(data.gas6.slice(1))
        const materialVal = data.material
        
        const last2char = materialVal.slice(-2)
        
        console.log("gas : ", subGas1 + "-" + subGas2 + ", " + subGas3 + ", ", subGas4 + ", " + subGas5 + "," + subGas6 + ", " + materialVal)

        /* if (last2char == "HF") {
            alert("THIS is HF!")
            if (! ((subGas1 >= 50 || subGas2 >= 50 || subGas3 >= 50 || subGas4 >= 50 || subGas5 >= 50 || subGas6 >= 50 )) {
                alert("This IS HF - at least one of gas value is equal or greater than '50' (SLPM) !")
            }
        } */
      /*   if (! ((subGas1 >= 50 || subGas2 >= 50 || subGas3 >= 50 || subGas4 >= 50 || subGas5 >= 50 || subGas6 >= 50 ) && (last2char == "HF") ) ){
            alert("High Flow Only Be Configured for SLPM Greater or Equal 50 !!!")
            trimHF = materialVal.slice(0, -3)
        } */

        if ((subGas1 >= 50 || subGas2 >= 50 || subGas3 >= 50 || subGas4 >= 50 || subGas5 >= 50 || subGas6 >= 50 ) !== (last2char == "HF") ){
            alert("HF wrong value selected!")
        }else{
            var trimHF = ""
            alert("HF SELECT RIGHT!")
            if(last2char === "HF") {
                trimHF = materialVal.slice(0, -3)
                console.log("trim: " +  materialVal.slice(0,-3))
            }else{ 
                trimHF = materialVal ;
                console.log("trimHF-MATERIAL: " + materialVal)
                console.log("trimHF: " + trimHF)}
            
            const cfgPN = trimHF + VHF + "-B" + data.mfc_inputs + data.mfc_outputs + "-" + data.gas1 + "-" + data.gas2 + "-" + data.gas3 + gas4 + gas5 + gas6
            console.log("cfgPN: ", cfgPN)
            setConfigPN(cfgPN)
        }

       /*  if (last2char == "HF") {
            console.log("HF Found")
            alert("HF Found!")
           trimHF = materialVal.slice(0, -3)
        }else{ trimHF = materialVal} */

        // const cfgPN = data.material + VHF + "-B" + data.mfc_inputs + data.mfc_outputs + "-" + data.gas1 + "-" + data.gas2 + "-" + data.gas3 + gas4 + gas5 + gas6
       
       

    }

    console.log(errors);
      
    const onChangedVHF = (e) => {
        const vhfValue = e.target.value
        setVHF(vhfValue)
    }

   /*  useEffect(() =>{
        setInput((prevState) => ({
            ...prevState, 
        }))
    }, [input]) */

    /* useEffect((data) => {
        setMaterial(material)
        setVHF(data.vhf_selected)
        setMFC1(data.gas1)
        const cfg = material + "-" + vhf_sel + "-" + mfc1
        setCFG(cfg)
    }, []) */

    /* useEffect(() => {
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
    }, []) */

    return (
        <>
        
        <div className="form-container truflow">
            <Header name="TruFLOW Configurator" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container xs={12}  direction="row" justify="flex-start">
                    <Grid container xs={12} spacing="1">
                        <Grid item xs={4} className='form-control'><label>Material</label></Grid>
                        <Grid item xs={2} className='form-control'><label>VHF</label></Grid>
                        <Grid item xs={2} className='form-control'><label>MFC Inputs</label></Grid>
                        <Grid item xs={2} className='form-control'><label>MFC Outputs</label></Grid>
                        <Grid item xs={2} className='form-control'><label>Control Type</label></Grid>

                        <Grid item xs={4} className='form-control'>
                            <select {...register("material")}>
                                <option value="FTFA">Analog</option>
                                <option value="FTFAS">Analog Stainless Steel</option>
                                <option value="FTFD">Digital</option>
                                <option value="FTFDS">Digital Stainless Steel</option>
                                <option value="FTFD-HF">Digital High Flow</option>
                                <option value="FTFDS-HF">Digital High Flow Stainless Steel</option>
                                <option value="FTFDH-HF">Expanded Capacity High Flow</option>
                            </select>
                        </Grid>
                        <Grid item xs={2} className='form-control'>
                            <select {...register("vhf_selected")} default="None" onChange={onChangedVHF}>
                                <option value="None">None</option>
                                <option value="VHF">VHF</option>
                            </select>
                        </Grid>
                        <Grid item xs={2} className='form-control custom-input'><input type="text" {...register("mfc_inputs", {required: true, maxLength: 1})}/></Grid>
                        <Grid item xs={2} className='form-control'><input type="text" value={3} {...register("mfc_outputs", {required: true, maxLength: 1})}/></Grid>
                        <Grid item xs={2} className='form-control'>
                            <select className={ vhf_sel === "VHF" ? "truflow-control-type-visible" : "truflow-control-type-hidden"} {...register("controlType", {requrired: false})}>
                                <option value="A">G3Pro</option>
                                <option value="B">G3Lite</option>
                                <option value="C">G3Lab</option>
                                <option value="D">OTHER</option>
                            </select>
                        </Grid>
                    </Grid>
                   
                    <Grid container xs={12} spacing="1">
                        <Grid item xs={2} className='form-control'>
                            <label>MFC1</label>
                           {/*  <input 
                                value={input.mfc1}
                                type="text"
                                onChange={handleChange}   
                                name="gas1"                        
                            /> */}
                            <input type="text" {...register("gas1", {required: true, maxLength: 6})}/>
                        </Grid>
                        <Grid item xs={2} className='form-control'>
                            <label>MFC2</label>
                            <input type="text" {...register("gas2", {required: true, maxLength: 6})}/>
                        </Grid>
                        <Grid item xs={2} className='form-control'>
                            <label>MFC3</label>
                            <input type="text" {...register("gas3", {required: true, maxLength: 6})}/>
                        </Grid>
                        <Grid item xs={2} className='form-control'>
                            <label>MFC4</label>
                            <input type="text" {...register("gas4", {required: false, maxLength: 6})}/>
                        </Grid>
                        <Grid item xs={2} className='form-control'>
                            <label>MFC5</label>
                            <input type="text" {...register("gas5", {required: false, maxLength: 6})}/>
                        </Grid>
                        <Grid item xs={2} className='form-control'>
                            <label>MFC6</label>
                            <input type="text" {...register("gas6", {required: false, maxLength: 6})}/>
                        </Grid>
                    </Grid>

                    <Grid container xs={12}>
                        <Grid item xs={3} className="form-control"><input type="submit" /></Grid>
                        <Grid item xs={9} className="form-control">
                           {/*  <input
                                value={input.mfc1}
                                type="textarea"
                                name="configuration"
                            /> */}
                            <input type="textarea" style={{marginLeft: 20}} value = {configPN} />
                            {/* <input type="textarea" value={cfg} /> */}
                        </Grid>
                    </Grid>
                    
                </Grid>
            </form>
        </div>
        </>
    )
}

