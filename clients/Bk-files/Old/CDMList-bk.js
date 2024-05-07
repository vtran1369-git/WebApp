import React, { useEffect, useRef, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link, useHistory } from 'react-router-dom';
import MfcCalService from "../api/MfcCalService";
import MFC_Cal_Form from './MFC_CAL_Form'
import Table from './Tables/CDMTable'
import { Grid } from "@material-ui/core";
import Header from "./Header";

export default function App (props) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)
  const [err, setErr] = useState(false)
  const [content, setContent] = useState(null)
  const pageShown = useRef(null)
  const [mfccalObj, setMfccalObj] = useState({ mfccal_data: [], cal_id: null })
  const [certreport, setCertReport] = useState({ id: null, certdata: [], reportdata: []})

  const columns = React.useMemo(
      ()=>[
              {
                  Header: 'Work Order',
                  accessor: 'WOnum'
              },
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
  const history = useHistory()

  const callMFC = (id) => {
    console.log(">>clicked at id: ", id)
    try {
      // http.get(`/mfccal/onebyid/${id}`)
      MfcCalService.getById(id)
        .then((res) => {
          const data = res.data.mfc_cal
          console.log(">>>mfccal response: ", data)
          setMfccalObj( { mfccal_data: data, cal_id: id })
          console.log("/mfccal/detail, mfccalObj: ", mfccalObj)
          history.push("/mfccal/detail", {data: data, id: id})
          pageShown.current = "MFCCal"
        })
        }catch (err) {
            console.log(err)
        }
  }
  
  const printCert = async (calID) => {
    //console.log(">>calID passing to CDMListing = ", calID)
    Promise.all([MfcCalService.getCertByID(calID), MfcCalService.getDataReportByID(calID)])
    .then(
      data =>{
        let cert = data[0].data.data
        let report = data[1].data.data
        console.log("cert: ", cert)
        console.log("report: ", report)
        setCertReport( { id: calID, certdata: cert, reportdata: report })
        history.push("/mfccal/cert", {id: calID, certdata: cert, reportdata: report})
        pageShown.current = "CertReport"
      }
    )
  }

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    // Set the loading state
    setLoading(true)
    // We'll even set a delay to simulate a server here
    setTimeout(() => {
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      console.log("fetchdata: ", pageIndex, '-', pageSize)
      MfcCalService.getLimitAll({pageIndex, pageSize})
      .then((res) => {
          console.log("message: ", res.data.message)
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
      }
      )
      setLoading(false)
    }
    }, 1000)
  }, [])
  // console.log("pageShown: ", pageShown.current)
  return (
    <>
      <Header name="CDM Listing" />
      <Grid item xs={12} className="App-tbl">
          
      
      {/* <div> */}
      { err ? (
          <div>
              {content}
          </div>
          ) : 
          (
            <div>
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onclick={callMFC}
                    handlePrintCert={printCert}
                    // handlePrintCert={props.handlePrintCert}
                /> 
            </div>
            )
      }
      {/* </div>   */}
      </Grid>
    </>
  )
}
