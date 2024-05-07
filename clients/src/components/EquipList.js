import React, { useState, useEffect } from "react";
import TableRadioSortFilter from '../Utils/TableRadioSortFilter'
import Table_Equip from './Table_Equip'
import "../Form.css";
import Header from "./Header";
import http from '../api/http-common'
import { Grid } from "@material-ui/core";
import Chance from "chance"
import  { useForm } from 'react-hook-form'
import CalEquipUpdate from './CalEquipUpdate'
import MfcCalService from "../api/MfcCalService";


const chance = new Chance(); 

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
  if (key !== "_id") {
    columns.push({
      accessor: key,
      Header: key
    });
  }
});
return columns;
}

const CalCertUpdate = (props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const data = props.rowValues
  const  calDueDate= data.CalDue 
  const  lastCalDate = data.LastCal 
  const calInfo = [data.Mfr, data.Model, data.Type, "".concat(['(', data.Descr, ')']), data.SN].join(' ') 
  
  const onsubmit = data => {
    console.log(">> onsubmit: ", data)
  }

  console.log("data in CertUpdate: ", data)
  useEffect(() => {
    reset(data)
    // console.log("data in Effect: ", data)
  }, [data])

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
                <Grid container xs={12} spacing="1" direction="row" justify="flex-start">
                    <Grid item xs={4}>
                      Description
                      <textarea>{calInfo}</textarea>
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container xs={8}>
                        <Grid item xs={4}>
                        Last Cal Date
                          <input type="text" value={lastCalDate}  />
                        </Grid>
                        <Grid item xs={4}>
                         Cal Due Date
                          <input type="text" value={calDueDate} /> 
                        </Grid>
                      </Grid>
                    </Grid>
        </Grid>
      </form>
    </>
  )
}

function App() {
  const [ equipData, setData ] = useState({
    columns: [],
    values: []
  })
  const [equipments, setEquipments] = useState([]);
  const [columns, setColumns] = useState([]);
  const [ rowProps, setRowProps ] = useState( {
    isSelected: false,
    rowValues: {}
  })

  useEffect(() => {
    console.log("running useEffect!!!")
    // http.get("mfccal/cert/equipment/all")
    MfcCalService.getAllEquipCal()
    .then((res) => {
        // console.log("equipments: ", res.data.equipList)
        const equipList = res.data.equipList;
        const data =equipList.map(item => { 
        const _id = chance.guid();
        return { _id, ...item};
        });
        // console.log("equipList: ", data);
        let dataCol = getColumns(data)
        setData( {columns: dataCol, values: data})
       /*  setEquipments(data);
        setColumns(getColumns(data)) */
    })
    }, []);

  const handleRowSelected = (row) => {
    /* console.log(">>Row = ", row)
    console.log(">>rowId: ", row.id) */
    const isSelected = !row.isSelected
    isSelected? console.log("selected!") : console.log(">>NOT selected!")
    let updateRowProps = { isSelected: isSelected, rowValues: row.values}
    setRowProps(updateRowProps)
    // console.log("update rowProps: ", rowProps)
  }

/*   useEffect(() => {
    console.log("Effect..in EquipList")
    
  }, [rowProps])
 */
  return (
      <>
      <Header name="Calibration Equipment Listing" />
      <div className="table-equipment">
        {/* <TableRadioSortFilter minRows= {4} columns={equipData.columns} data={equipData.values} onclick={handleRowSelected}/> */}
        <Table_Equip minRows= {4} columns={equipData.columns} data={equipData.values} onclick={handleRowSelected}/>
      </div>
      <div className="equip-info">
        {console.log(">>rowProps.clicked: ", rowProps)}
        { rowProps.isSelected && <CalEquipUpdate rowValues = {rowProps.rowValues} />}
        {/* { rowProps.clicked && <CalCertUpdate rowValues= {rowProps.data} />} */}
      </div>
      </>
  )
}
  
export default App;
