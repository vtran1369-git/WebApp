import React, { useState, useEffect } from "react";
import Table from '../Utils/TableProps'
import "../Form.css";
import Header from "./Header";
import http from '../api/http-common'
import ETraveler_Form from './ETraveler_Form'

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  // console.log(">>sample: ", sample)
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

function App() {
  const [TF, setTF] = useState({ TFData: [], TFColumns: [] });
  const [travelerData, setTravelerData] = useState({})
  const [display, setDisplay] = useState("TFList")
  const hiddenCols = ["fsnId", "woId"]

  useEffect(() => {
    http.get("traveler/truflow/all")
    .then( (result) =>{
        const data = result.data.tfList
        console.log(">>traveler TFList: ", data[0])
        setDisplay("TFList")
        setTF({TFData: data, TFColumns: getColumns(data)})
    })
  }, []);

  const handleTraveler = (row) => {
    console.log(">>handleTraveler: ", row.values.Serial_Number)
    const fsn = row.values.Serial_Number
    try{
      http.get(`/traveler/truflow/onebyid/${fsn}`)
      .then( (result) => {
        console.log("backend truflow responded: ", result.data)
        setTravelerData(result.data)
        setDisplay("Etraveler")
      })
    }catch(err) { console.log(err)}
  }

  const TFListing = () =>{
    return (
      <>
      <Header name="TruFlow Test Listing" />
      <div className="App-tbl">
          <Table minRows= {4} columns={TF.TFColumns} data={TF.TFData} hiddenCols={hiddenCols} onclick={handleTraveler} />
      </div>
      </>
    )
  }
  const RenderSwitch = (param) =>{
    switch(param) {
      case "TFList":
        return <TFListing />
      case "Etraveler":
        return <ETraveler_Form data={travelerData} />
      default: 
        return <div>Ops..not found!</div>
    }
  }
  return (
      <>
        {RenderSwitch(display)}
      {/* <Header name="TruFlow Test Listing" />
      <div className="App-tbl">
          <Table minRows= {4} columns={TF.TFColumns} data={TF.TFData} hiddenCols={hiddenCols} onclick={handleSelection} />
      </div> */}
      </>
  )
  }
  
export default App;
