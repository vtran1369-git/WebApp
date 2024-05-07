import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import WOService from "../api/WOService";
import Table from './Tables/WOTable'
import { Grid } from "@material-ui/core";
import Header from "./Header";
import usePersistedState from "../Utils/usePersistedState";
import { removeLocalWOList } from "../Utils/locStorage";
import Button from 'react-bootstrap/Button';

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
  const [persistedData, setPersistedData] = usePersistedState("wo_list", [])
  const [pagePersist, setPagePersist] = usePersistedState("wo_pages", 0)
  const [pageIndexPersist, setPageIndexPersist] = usePersistedState("wo_pageindex", 0)
 
  const columns = React.useMemo(
    ()=>[
            {
                Header: 'WO#',
                accessor: 'Work Order ID'
            },
            {
                Header: `Req'd Date`,
                accessor: 'Required Date'
            },
            {
                Header: 'Customer',
                accessor: 'EndCust'
            },
            {
                Header: 'Qty',
                accessor: 'Required Qty'
            },
            {
                Header: 'Status',
                accessor: 'WO Status'
            },
            {
                Header: 'Item Name',
                accessor: 'Item Name'
            }
    ]
)
  // const history = useHistory()
  const navigate = useNavigate()

  const handleRefreshing = () => {
    console.log("handleREfreshing")
    removeLocalWOList();
    const pageIndex = 0;
    const pageSize = 20;
    WOService.getAll({pageIndex, pageSize})
    .then((res) => {
      // console.log("fetching wo List: ", res.data.woList)
      const myDataRet = res.data.woList
      console.log("mydataRET: ", myDataRet)
      setData(myDataRet)
      console.log("pages count: ", res.data.pages)
      setPageCount(res.data.pages)
      // setPageCount(parseInt(Math.ceil(res.data.pages)))
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
  const handleWO_RowSelected = (row) => {
    console.log(">>Original ROW Selected :  ", row.original)
    WOService.getByWOID(row.original["Work Order ID"])
    .then(result => {
      console.log("Detail WO : ", result.data.wo)
      console.log("Detail Picklist: ", result.data.picklist)
      navigate("/workorder/detail", {state: {wo_data: result.data.wo, picklist: result.data.picklist}} )
    })
    
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
      }else {
        console.log("fetchID != fetchIdRef")
        console.log("persistadata is empty, then fetching database")
        WOService.getAll({pageIndex, pageSize})
          .then((res) => {
            // console.log("fetching wo List: ", res.data.woList)
            const myDataRet = res.data.woList
            console.log("mydataRET: ", myDataRet)
            setData(myDataRet)
            console.log("pages count: ", res.data.pages)
            setPageCount(res.data.pages)
            // setPageCount(parseInt(Math.ceil(res.data.pages)))
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

  return (
    <>
      <Header name="Work Order Listing" />
      <div>
          {/* <button style={{height: "28px", marginLeft: "5px"}} onClick={handleRefreshing}>Refresh</button> */}
        <Button variant="secondary" style={{marginLeft: "20px"}} onClick={handleRefreshing}>Refresh</Button> 
      </div>
      <Grid item xs={12} className="App-tbl">
      { err ? (
          <div>
              {content}
          </div>
          ) : 
          (
            <>
            <div>
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onselected={handleWO_RowSelected}
                /> 
            </div>
            </>
            )
      }
      </Grid>
    </>
  )
}
