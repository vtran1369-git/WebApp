import React, { useEffect, useRef, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link, useNavigate } from 'react-router-dom';
import Agitator from "../api/AgitatorService";

import Table from './Tables/eTravelerTable'
import { Grid } from "@material-ui/core";
import Header from "./Header";
import usePersistedState from "../Utils/usePersistedState";

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
  const [persistedData, setPersistedData] = usePersistedState("agitator", [])
  // const [pagePersist, setPagePersist] = usePersistedState("agitator_pages", 0)
  const [pageIndexPersist, setPageIndexPersist] = usePersistedState("agitator_pageindex", 0)
 
  const columns = React.useMemo(
    ()=>[ /* {
              Header: 'ID',
              accessor: 'id'
          }, */
          {
              Header: 'WO#',
              accessor: 'wo_num'
          },
          {
            Header: 'SN',
            accessor: 'serial_num'
          }
          ,
          {
              Header: 'Model',
              accessor: 'model_num'
          },
          {
              Header: 'PO',
              accessor: 'po_num'
          },
          {
              Header: 'Tech',
              accessor: 'tech_name'
          },
          {
            Header: 'Performed',
            accessor: 'opFull_Name'
          },
          {
              Header: 'QA',
              accessor: 'qaFull_Name'
          },
          {
            Header: 'Final QA',
            accessor: 'finalQAFull_Name'
          },
          {
            Header: 'Revised',
            accessor: 'editedFull_Name'
          },
          {
              Header: 'Created Date',
              accessor: 'tech_date'
          },
          {
              Header: "Signed",
              accessor: 'signed'
          },
          {
              Header: 'Status',
              accessor: 'status'
          }
      ]
  )
  // const history = useHistory()
  const navigate = useNavigate()

  const handleTraveler = (row) => {
    console.log(">> traveler_id: ", row.original.id)
    console.log(">>ROW Selected :  ", row.values)
    console.log(">>Original ROW Selected :  ", row.original)
    // history.push("/traveler/agitator/editview", {agitator_data: row.original})
    navigate("/traveler/agitator/editview", {state: {agitator_data: row.original}} )
  }

  const callAgitator = (id) => {
    //console.log(">>clicked at id: ", id)
    try {
      // http.get(`/mfccal/onebyid/${id}`)
      Agitator.getById(id)
        .then((res) => {
          const data = res.data.agitator
          // history.push("/etraveler/agitator/view", {data: data, id: id})
          pageShown.current = "Agitator"
        })
        }catch (err) {
            console.log(err)
        }
  }
  
  const printCert = async (calID) => {
   
   /*  Promise.all([MfcCalService.getCertByID(calID), MfcCalService.getDataReportByID(calID)])
    .then(
      data =>{
        let cert = data[0].data.data
        let report = data[1].data.data
     
        history.push("/mfccal/cert", {id: calID, certdata: cert, reportdata: report})
        pageShown.current = "CertReport"
      }
    ) */
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
      /* if(persistedData.length > 0 && pageIndex === pageIndexPersist){
        console.log("persisteddata is ", persistedData)
        setData(persistedData)
        // setPageCount(parseInt(pagePersist)) 
        // console.log("pagePersistINdex: ", pageIndexPersist)
      }
      else */
      if(true){
        console.log("fetchID != fetchIdRef")
        console.log("persistadata is empty, then fetching database")
        Agitator.getAll({pageIndex, pageSize})
          .then((res) => {
            console.log("fetching Agitator List: ", res.data)
            const myDataRet = res.data.agitators
            setData(myDataRet)
            setPageCount(res.data.pages)
            // setPageCount(parseInt(Math.ceil(res.data.pages)))
            setPersistedData(myDataRet)
            // setPagePersist(res.data.pages)
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
  /*   console.log("handleREfreshing")
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
        ) */
    //window.location.reload();
  }

  const SearchWO = () => {
    const woRef = useRef(null)
  /*   const handleSearch = () => {
      const wo = woRef.current.value
      //console.log("wo#: ", wo)
      const pageIndex=0, pageSize = 20
      MfcCalService.getByWO({pageIndex, pageSize, wo})
      .then((res) => {
        // console.log("message: ", res.data.message)
        const myDataRet = res.data.cdmList
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
    } */
    return(
      <>
      <Grid container xs={12} spacing="2">
        <Grid item xs={5}>
          <button style={{height: "28px", marginLeft: "5px"}} onClick={handleRefreshing}>Refreshing Data</button>
        </Grid>
        <Grid item xs="4">
            <input type="text" name="wo" ref={woRef} placeholder="Search by WO" />
        </Grid>
      {/*   <Grid item xs={3}>
          <button style={{height: "28px"}} onClick={handleSearch}>Search</button>
        </Grid> */}
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
      <Header name="Agitator" />
      <Grid item xs={12} className="App-tbl">
      { err ? (
          <div>
              {content}
          </div>
          ) : 
          (
            <>
              <Grid container xs={12} spacing={2} direction="row" className="cdm-menubar" style={{marginLeft: "15px", marginBottom: "0px", height: "45px"}} >
             {/*    <Grid item xs={5}><SearchWO /></Grid>
                <Grid item xs={4}><SearchSN /></Grid> */}
                <Grid item xs={2}><BackToPreviousPage /></Grid>
              </Grid>
            <div>
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onclick={callAgitator}
                    handlePrintCert={printCert}
                    onselected={handleTraveler}
                /> 
            </div>
            </>
            )
      }
      </Grid>
    </>
  )
}
