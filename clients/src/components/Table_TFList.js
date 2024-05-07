import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TravelerService from "../api/TravelerService";
import Table from './Tables/TFTable'
import usePersistedState from "../Utils/usePersistedState";
import { Grid } from "@material-ui/core";
import { removeLocalTFL } from "../Utils/locStorage";
import BackToPreviousPage from "../Utils/BackToPreviousPage";

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
  const [err, setErr] = useState(false)
  const [content, setContent] = useState(null)
  const [persistedData, setPersistedData] = usePersistedState("tfl", [])
  const [pagePersist, setPagePersist] = usePersistedState("tflpages", 0)
  const [pageIndexPersist, setPageIndexPersist] = usePersistedState("tflpageindex", 0)
  const [snSearch, setSNSearch] = useState("")

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
     
  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      if(persistedData.length > 0 && pageIndex === pageIndexPersist){
        console.log("persisdata is existed!")
        setData(persistedData)
        setPageCount(parseInt(pagePersist))
      }else{
        console.log("tfl data in local is empty, fetching to db now..")
        TravelerService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            // console.log("data: ", res.data)
            const myDataRet = res.data.tfList
            setData(myDataRet)
            setPageCount(parseInt(res.data.pages)) 
            setPersistedData(myDataRet)
            setPagePersist(res.data.pages)
            setPageIndexPersist(pageIndex) 
        },
        (error) => {
        console.log("error: ", error)
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setErr(true)
          setContent(_content);
          console.log("_content: ", _content)
        }
        )
        setLoading(false)
      }
    }}, 1000)
  }, [])

  const handleRefreshing = () => {
    //console.log("handleREfreshing")
    removeLocalTFL();
    const pageIndex = 0;
    const pageSize = 20;
    TravelerService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            // console.log("message: ", res.data.message)
            const myDataRet = res.data.tfList
            setData(myDataRet)
            setPageCount(parseInt(res.data.pages))  
            setPersistedData(myDataRet)
            setPagePersist(res.data.pages)
            setPageIndexPersist(pageIndex)
        },
        (error) => {
        console.log("error: ", error)
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setErr(true)
          setContent(_content);
          console.log("_content: ", _content)
        }
        )
    //window.location.reload();
  }

  const SearchSN = () => {
    const snRef = useRef(null)
    const handleSearch = () => {
      const sn = snRef.current.value
      // const sn = form["sn"].value
      // setSNSearch(sn)
      console.log("sn#: ", sn)
      const pageIndex=0, pageSize = 20
      TravelerService.getTFLbySN({pageIndex, pageSize, sn})
      .then((res) => {
        // console.log("message: ", res.data.message)
        const myDataRet = res.data.tfList
        console.log("search return: ", myDataRet)
        setData(myDataRet)
        setPageCount(parseInt(res.data.pages))  
      },
      (error) => {
      console.log("error: ", error)
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setErr(true)
      setContent(_content);
      console.log("_content: ", _content)
      })
    }
    return(
      <>
      <Grid container xs={12} spacing="3" style={{marginLeft: "5px", paddingTop: "5px"}}>
        <Grid item xs="6">
          {/* <form ref={snFormRef}> */}
          <div>
            <input type="text" name="sn" ref= {snRef} placeholder="Search by SN" />
          </div>
        </Grid>
        <Grid item xs={3}>
          <button style={{height: "28px"}} onClick={handleSearch}>Search</button>
        </Grid>
      </Grid>
      </>
    )
  }

  return (
    <>
    { err ? (
      <div>
        {content}
      </div>
      ):
      (
        <>
          <Grid container xs={12} spacing={2} direction="row" className="cdm-menubar" style={{marginLeft: "15px", marginBottom: "0px", height: "45px"}} >
            <div><SearchSN /></div>
            <div style={{paddingTop: "5px"}}><BackToPreviousPage /></div>
          </Grid>
          <div>
            <Table
              columns={columns}
              data={data}
              fetchData={fetchData}
              loading={loading}
              pageCount={pageCount}
              onselected={onselected}
              linkclicked={linkclicked}
            />
          </div>
        </>
      )
    }
    </>  
  )
}
