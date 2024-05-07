import React, { useState, useEffect } from "react";
// import Table from './Table'
import Table from '../Utils/GenericTable'
import "../App.css";
import axios from "axios";
import Chance from "chance";
import Header from "./Header";

const moveElement = (array,initialIndex,finalIndex) => {
	array.splice(finalIndex,0,array.splice(initialIndex,1)[0])
	console.log(array);
	return array;
  }

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

function App() {
  /* const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]); */
  const [newData, setNewData] = useState([]);
  const [newColumns, setNewColumns] = useState([]);

  useEffect(() => {
    (async () => {
      await axios("http://localhost:8080/api/workorder/all")
      .then((res) => {
        const woList = res.data.work_orders;
        const data =woList.map(item => { 
          const _id = chance.guid();
          return { _id, ...item};
        });
        //console.log("data: ", data);
        const newData = data.map(({'user_registry.fullname': Full_Name, ...rest}) => ({ Full_Name, ...rest}));
        let objArray = []
        let length = newData.length
        // console.log("lennth: ", length)

        for(let i = 0; i < length; i++){
          let newObj = {}
          newObj["WO Number"] = newData[i]["WO Number"]
          newObj["Quantity"] = newData[i]["Quantity"]
          newObj["Created Date"] = newData[i]["Created Date"]
          newObj["Full_Name"] = newData[i]["Full_Name"]
          newObj["Required Date"] = newData[i]["Required Date"]
          newObj["Status"] = newData[i]["Status"]
          newObj["Instruction"] = newData[i]["Instruction"]
          objArray.push(newObj)
        }
        // console.log("ojbArray: ", objArray)
        /* setNewData(newData);
        setNewColumns(getColumns(newData)) */
        setNewData(objArray)
        setNewColumns(getColumns(objArray))
        // console.log("running useEffect!!!")
      })
    })();
  }, []);

  return (
    <>
      <Header name="Work Order Listing" />
      <div className="App-tbl">
        <Table minRows= {4} columns={newColumns} data={newData} />
      </div>
    </>
  )
}
  
export default App;
