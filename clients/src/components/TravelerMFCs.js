import { useTable, useRowSelect } from 'react-table';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import MfcCalService from '../api/MfcCalService';

function getHeader(cols) {
    const headers = [];
    cols.map( item =>(
        // console.log(item.accessor , '-', item.header)
        headers.push({
            accessor: item.accessor,
            Header: item.header
        })
        
    ))
  return headers;
}


export default function App(props) {
    const location = useLocation()
    console.log("location.state: ", location.state)
    const data = location.state.data
    const fsn = location.state.fsn
    const [certreport, setCertReport] = useState({ id: null, certdata: [], reportdata: []})
    const columns = [
        { accessor: "id", header: "Index" }, 
        { accessor: "SN", header: "Serial Number"},
        { accessor: "Gas", header: "Gas" }, 
        { accessor: "FlowStr", header: "Flow" },
        {accessor: "calDate",  header: "Cal Date"}, 
        {accessor: "calName", header: "Calibrated by"}, 
        {accessor: "QAdate",  header: "QA Date"}
    ]

    const onselect_printCert = () => {
      
    }
    const printCert = (calID) => {
        console.log("Printing..Cert!")
        Promise.all([MfcCalService.getCertByID(calID), MfcCalService.getDataReportByID(calID)])
        .then(
          data =>{
            let cert = data[0].data.data
            let report = data[1].data.data
            setCertReport( { id: calID, certdata: cert, reportdata: report })
            // setDisplay("CertReport")
          }
        )
      }
    
    const printReport = () => {
        console.log("Printing...report!")
      }
    
    /* const columns = [{ accessor: "id", header: "Index" }, { accessor: "SN", header: "Serial Number"}, { accessor: "Gas", header: "Gas" }, { accessor: "FlowStr", header: "Flow" },
      {accessor: "calDate",  header: "Cal Date"}, {accessor: "calName", header: "Calibrated by"}, {accessor: "QAdate",  header: "QA Date"}
      ]
 */
    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef
        
            React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])
        
            return (
            <> <input type="radio" ref={resolvedRef} {...rest} /> </>
            )
        }
    )

    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = useTable(
        { 
            columns, 
            data,
            autoResetHiddenColumns: false,
            // autoResetPage: false
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
              // Let's make a column for selection
              {
                id: 'selection',
                Header: <div>Cert-Report</div>,
                Cell: ({ row, toggleAllRowsSelected, toggleRowSelected }) => {                      
                  const currentState = row.getToggleRowSelectedProps();
                  return (
                    <div>
                      <IndeterminateCheckbox
                        {...currentState}
                        onClick={() => {
                          toggleAllRowsSelected(false);
                          toggleRowSelected(row.id, !currentState.checked);
                          onselect_printCert(row.original.calID)
                          console.log(">>row: ", row)
                          console.log("calID: ", row.original.calID)
                        }} 
                      />
                    </div>
                  )
              }},
              ...columns
            ])
        }   
    )

    return (
        <>
        <h3>Serial Number: {fsn}</h3>    
        <table {...getTableProps()} className = "simple-table" size="small">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} >
                        {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()} >
                            {cell.render('Cell')}
                        </td>
                    )
                    })}
                </tr>
            )
            })}
            </tbody>
        </table>
        </>
    );
}

