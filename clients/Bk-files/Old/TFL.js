import React, { useEffect, useState, useRef } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link, useHistory } from 'react-router-dom';
import TravelerService from "../api/TravelerService";
import Table from '../components/Tables/TFTable'
import Header from "./Header";

export default function App ({onselected, linkclicked}) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)
    const [travelerData, setTravelerData] = useState({})
    const fsnRef = useRef()
    const [mfcs, setMfcs] = useState({
      value: [],
      shown: false
    })
    const columns = React.useMemo(
        ()=>[
                {
                    Header: 'Serial Number',
                    accessor: 'Serial_Number'
                },
                {
                    Header: 'Work Order',
                    accessor: 'Work_Order'
                },
                {
                    Header: 'Product Type',
                    accessor: 'Product_Type'
                },
                {
                    Header: 'Date',
                    accessor: 'Date'
                },
                {
                    Header: 'Status',
                    accessor: 'Status'
                },
        ]
    )

    const history = useHistory()

    const handleTraveler = (row) => {
        console.log(">>handleTraveler: ", row.values)
        const fsn = row.values.Serial_Number
        try{
            // http.get(`/traveler/truflow/onebyid/${fsn}`)
            TravelerService.getTravelerByFSN(fsn)
            .then( (result) => {
            console.log("backend truflow responded: ", result.data)
            setTravelerData(result.data)
            history.push("/traveler/truflow/etraveler", result.data)
            })
        }catch(err) { console.log(err)}
    }
    
    const listMFCs = React.useCallback((row) => {
      console.log(">>listMFCs: ", row.values)
      const fsn = row.values.Serial_Number
      fsnRef.current = row.values.Serial_Number
      try{
      //   http.get(`/traveler/truflow/mfcs/${fsn}`)
          TravelerService.getMFCsByFSN(fsn)
          .then( result => {
              const data = result.data.data
              // console.log("get data response from server: ", data)
              const dataObj =data
              const valObjArr = Object.values(dataObj)
              // console.log("DATAROW: ", valObjArr)
              setMfcs( { value: valObjArr, shown: true })
              history.push("/traveler/truflow/mfclist", {data: valObjArr, fsn: fsn})
              // setDisplay("TFList-MFCs")
          })
          }catch(err) { console.log(err)}
      }
    )
    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
       /*  const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize */
        console.log("fetchdata: ", pageIndex, '-', pageSize)
        TravelerService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            console.log("data: ", res.data)
            const myDataRet = res.data.tfList
            setData(myDataRet)
            setPageCount(parseInt(res.data.pages))  
        })
        setLoading(false)
    }
    }, 1000)
    }, [])

    return (
        <>
            <Header name="TruFlow Test Listing" />
            <div className="App-tbl">
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onselected={handleTraveler}
                    linkclicked={listMFCs}
                
                />
            </div>
        </>
        
    )
}
