import React, { useEffect, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link } from 'react-router-dom';
import MfcCalService from "../api/MfcCalService";

function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
}) {
    const defaultColumn = React.useMemo(
        () => ({
        Filter: TextFilter,
        }),
        []
    )

    function TextFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length
        return (
        <input
            value={filterValue || ''}
            onChange={e => {
            setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
        )
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
          columns,
          data,
          defaultColumn,
          initialState: { pageIndex: 0 , pageSize: 20}, // Pass our hoisted table state
          manualPagination: true, // Tell the usePagination
          // hook that we'll handle our own data fetching
          // This means we'll also have to provide our own
          // pageCount.
          pageCount: controlledPageCount,
          autoResetFilter: false,
          autoResetPage: false
        },
        useFilters,
        useSortBy,
        usePagination,
    )

    useEffect(() => {
        fetchData({ pageIndex, pageSize })
      }, [fetchData, pageIndex, pageSize])

    return (
        <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <div className="filter">{column.canFilter? column.render('Filter'): null}</div>
                </th>
              ))} 
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>   
    )
}

export default function App (onclick, handlePrintCert) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

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
        MfcCalService.getLimitAll({pageIndex, pageSize})
        .then((res) => {
            console.log("data: ", res.data)
            const myDataRet = res.data.cdmList
            setData(myDataRet)
            setPageCount(parseInt(res.data.pages))  
        })
        setLoading(false)
    }
    }, 1000)
    }, [])

    return (
        <Table
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
        />
    )
}
/* 
export default function Table({ onclick, handlePrintCert }) {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])
    const [pageCount, setPageCount] = useState(1)
   
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

    function TextFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length
        return (
        <input
            value={filterValue || ''}
            onChange={e => {
            setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
        )
    }

    const defaultColumn = React.useMemo(
        () => ({
        Filter: TextFilter,
        }),
        []
    )
  
    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef
    
        React.useEffect(() => {
            console.log(">>>Indetermin..called")
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])
        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        setHiddenColumns,
        controlledPageCount,
    } = useTable(
        {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10},
        defaultColumn,
        autoResetHiddenColumns: false,
        autoResetSelectedRows: false,
        manualPagination: true,
        pageCount: controlledPageCount,
        },
        useFilters,
        useSortBy,
        usePagination,
        
        useRowSelect,
        hooks => {
        hooks.visibleColumns.push(columns => [
          
            {
            id: 'selection',
          
            Header: <div>PrintCert</div>,
            Cell: ({ row }) =>(
                <div>
             
                <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                />
                </div>
            ),
            },
            ...columns,
        ])
        }
    );

    const setHiddenCols = () =>{
        const invisibleCols = ["CalID", "MFCID", "MatBatch", "Comments", "Added", "LastCal", "CalDue", "Mfr", "model", "SN", "MfrDevID"];
        setHiddenColumns(invisibleCols);
    } 

    const fetchData = ({pageIndex, pageSize}) => {
      console.log("fetchdata: ", pageIndex, '-', pageSize)
      MfcCalService.getLimitAll({pageIndex, pageSize})
      .then((res) => {
        console.log("data: ", res.data)
        const myDataRet = res.data.cdmList
        setData(myDataRet)
        setColumns(getColumns(myDataRet))
        setPageCount(res.data.pages)  
      })
    }

    useEffect(() => {
      console.log("table-cdlist effect..!")
      console.log("pageindex, pagesize: ", pageIndex, '-', pageSize)
      setHiddenCols()
      MfcCalService.getLimitAll({pageIndex, pageSize})
      .then((res) => {
        console.log("data: ", res.data)
        const myDataRet = res.data.cdmList
        setData(myDataRet)
        setColumns(getColumns(myDataRet))
        setPageCount(res.data.pages)    
      })
     
    ,[pageIndex, pageSize])

  const handleRowSelected = (row, calID) => {
    //console.log(">>selectedRowID with CalID= ", calID)
    row.toggleRowSelected(false)
    row.isSelected? console.log("not seleted") : console.log(">>selectedRowID with CalID= ", calID) 
    !row.isSelected && handlePrintCert(calID)
  }
    return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
              
                  <div className="filter">{column.canFilter? column.render('Filter'): null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} 
                className={`tr ${row.isSelected? 'selected': ''}`}
                onChange = {() => handleRowSelected(row, row.original.CalID)}
              
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {
                       
                          index === 1? 
                          <Link onClick ={() => onclick(row.original.CalID)}>
                            {cell.render("Cell")}
                          </Link>
                            : cell.render("Cell")
                      }
                    </td>
                  );
                })}
              </tr>
              
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input 
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px', padding: '2px' }}
          />
        </span>{' '}
        <select style={{ width: '120px'}}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
 */