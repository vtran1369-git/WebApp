import React, { useEffect, useState, useRef } from "react";
import TravelerService from "../api/TravelerService";
import Table from '../components/Tables/TFTable'

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
        /*  const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize */
        // console.log("fetchdata: ", pageIndex, '-', pageSize)
        TravelerService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            // console.log("data: ", res.data)
            const myDataRet = res.data.tfList
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
    }}, 1000)
  }, [])

  return (
    <>
    { err ? (
      <div>
        {content}
      </div>
    ):
    (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      onselected={onselected}
      linkclicked={linkclicked}
    />
    )
    }
    </>  
  )
}
