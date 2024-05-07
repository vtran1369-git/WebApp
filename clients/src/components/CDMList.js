import React, { useEffect, useRef, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link, useHistory, useNavigate } from 'react-router-dom';
import MfcCalService from "../api/MfcCalService";
import MFC_Cal_Form from './MFC_CAL_Form'
import Table from './Tables/CDMTable'
import { Grid } from "@material-ui/core";
import Header from "./Header";
import usePersistedState from "../Utils/usePersistedState";
import { removeLocalCDMList } from "../Utils/locStorage";
import BackToPreviousPage from "../Utils/BackToPreviousPage";

export default function App (props) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)
  const [err, setErr] = useState(false)
  const [content, setContent] = useState(null)
  const pageShown = useRef(null)
  /* const [mfccalObj, setMfccalObj] = useState({ mfccal_data: [], cal_id: null })
  const [certreport, setCertReport] = useState({ id: null, certdata: [], reportdata: []}) */
  const [persistedData, setPersistedData] = usePersistedState("cdm", [])
  const [pagePersist, setPagePersist] = usePersistedState("pages", 0)
  const [pageIndexPersist, setPageIndexPersist] = usePersistedState("pageindex", 0)
  
  const navigate = useNavigate()

  const columns = React.useMemo(
      ()=>[
              {
                  Header: 'Work Order',
                  accessor: 'WOnum'
              },
              {
                Header: 'SN',
                accessor: 'SN'
              }
              ,
              {
                  Header: 'Cal.Date',
                  accessor: 'CalDTG'
              },
              {
                  Header: 'Operator',
                  accessor: 'Operator'
              },
              {
                  Header: 'Customer',
                  accessor: 'Customer'
              },
              {
                  Header: 'Customer Location',
                  accessor: 'Customer Location'
              },
              {
                  Header: 'DUT',
                  accessor: 'DUT'
              },
              {
                  Header: 'Gas/Range',
                  accessor: 'GasRange'
              },
      ]
  )
  // const history = useHistory()

  const callMFC = (id) => {
    //console.log(">>clicked at id: ", id)
    try {
      // http.get(`/mfccal/onebyid/${id}`)
      MfcCalService.getById(id)
        .then((res) => {
          const data = res.data.mfc_cal
          // console.log(">>>mfccal response: ", data)
          // setMfccalObj( { mfccal_data: data, cal_id: id })
          // console.log("/mfccal/detail, mfccalObj: ", mfccalObj)
          // history.push("/mfccal/detail", {data: data, id: id})
          navigate("/mfccal/detail", {state: {data: data, id: id}})
          pageShown.current = "MFCCal"
        })
        }catch (err) {
            console.log(err)
        }
  }
  
  const printCert = async (calID) => {
    console.log(">>calID passing to CDMListing = ", calID)
    Promise.all([MfcCalService.getCertByID(calID), MfcCalService.getDataReportByID(calID)])
    .then(
      data =>{
        let cert = data[0].data.data
        let report = data[1].data.data
        console.log("cert: ", cert)
        console.log("report: ", report)
        // setCertReport( { id: calID, certdata: cert, reportdata: report })
        // history.push("/mfccal/cert", {id: calID, certdata: cert, reportdata: report})
        navigate("/mfccal/cert", {state: {id: calID, certdata: cert, reportdata: report}})
        pageShown.current = "CertReport"
      }
    )
  }

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    console.log("fetchdata called: ", fetchId)
    // Set the loading state
    setLoading(true)
    // We'll even set a delay to simulate a server here
    setTimeout(() => {
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      console.log("fetchID = fetchIdRef")
      //console.log("fetchdata: ", pageIndex, '-', pageSize)
      if(persistedData.length > 0 && pageIndex === pageIndexPersist){
        // console.log("persisteddata is ", persistedData)
        setData(persistedData)
        setPageCount(parseInt(pagePersist)) 
        // console.log("pagePersistINdex: ", pageIndexPersist)
      }else{
        console.log("fetchID != fetchIdRef")
        console.log("persistadata is empty, then fetching database")
        MfcCalService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            console.log("fetching CDM List: ", res.data.message)
            const myDataRet = res.data.cdmList
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
      }
      setLoading(false)
    }
    }, 1000)
  }, [])
  
  const handleRefreshing = () => {
    console.log("handleREfreshing")
    removeLocalCDMList();
    const pageIndex = 0;
    const pageSize = 20;
    MfcCalService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            // console.log("message: ", res.data.message)
            const myDataRet = res.data.cdmList
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

  const SearchWO = () => {
    const woRef = useRef(null)
    const handleSearch = () => {
      const wo = woRef.current.value
      //console.log("wo#: ", wo)
      const pageIndex=0, pageSize = 20
      MfcCalService.getByWO({pageIndex, pageSize, wo})
      .then((res) => {
        // console.log("message: ", res.data.message)
        const myDataRet = res.data.cdmList
        setData(myDataRet)
        setPageCount(parseInt(res.data.pages))  
       /*  setPersistedData(myDataRet)
        setPagePersist(res.data.pages)
        setPageIndexPersist(pageIndex) */
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
      <Grid container xs={12} spacing="2">
        <Grid item xs={5}>
          <button style={{height: "28px", marginLeft: "5px"}} onClick={handleRefreshing}>Refreshing Data</button>
        </Grid>
        <Grid item xs="4">
            <input type="text" name="wo" ref={woRef} placeholder="Search by WO" />
        </Grid>
        <Grid item xs={3}>
          <button style={{height: "28px"}} onClick={handleSearch}>Search</button>
        </Grid>
      </Grid>
      </>
    )
  }

  const SearchSN = () => {
    const snRef = useRef(null)
    const handleSearch = () => {
      const sn = snRef.current.value
      // const sn = form["sn"].value
      // setSNSearch(sn)
      console.log("sn#: ", sn)
      const pageIndex=0, pageSize = 20
      MfcCalService.getBySN({pageIndex, pageSize, sn})
      .then((res) => {
        // console.log("message: ", res.data.message)
        const myDataRet = res.data.cdmList
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
      <Grid container xs={12} spacing="2">
        <Grid item xs="5">
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

  /* const BackToPreviousPage = () => {
    return(
      <>
      <div><button style={{height: "28px"}} onClick={()=>window.location.reload()} >Back To Previous Page</button></div>
      </>
    )
  } */

  return (
    <>
      <Header name="Calibration Data Management" />
      <Grid item xs={12} className="App-tbl">
      { err ? (
          <div>
              {content}
          </div>
          ) : 
          (
            <>
              <Grid container xs={12} spacing={2} direction="row" className="cdm-menubar" style={{marginLeft: "15px", marginBottom: "0px", height: "45px"}} >
                <Grid item xs={5}><SearchWO /></Grid>
                <Grid item xs={4}><SearchSN /></Grid>
                <Grid item xs={2}><BackToPreviousPage /></Grid>
              </Grid>
            <div>
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onclick={callMFC}
                    handlePrintCert={printCert}
                /> 
            </div>
            </>
            )
      }
      </Grid>
    </>
  )
}
