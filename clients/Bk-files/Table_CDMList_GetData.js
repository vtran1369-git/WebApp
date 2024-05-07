import React, { useEffect, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link } from 'react-router-dom';
import MfcCalService from "../api/MfcCalService";
import { setDefaultLocale } from "react-datepicker";

export default function Table({ onclick, handlePrintCert }) {
    /* const [ pages, setPages ] = useState(1)
    const [ perPage, setPerPage ] = useState(10)
 */
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
            {/* <input type="radio" ref={resolvedRef} {...rest} /> */}
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
        //just added to work on row selection
        useRowSelect,
        hooks => {
        hooks.visibleColumns.push(columns => [
            // Let's make a column for selection
            {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            /*  Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
            ), */
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            /* Cell: ({ row }) => (
                <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
            ), */
            Header: <div>PrintCert</div>,
            Cell: ({ row }) =>(
                <div>
                {/* PrintCert */}
                <IndeterminateCheckbox
                    // onClick={()=> setSelectedRowId(row.id)}
                    {...row.getToggleRowSelectedProps()}
                />
                </div>
            ),
            },
            ...columns,
        ])
        }
    );
/* 
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("wo_num", value);
    setFilterInput(value);
  }; */

    const setHiddenCols = () =>{
        const invisibleCols = ["CalID", "MFCID", "MatBatch", "Comments", "Added", "LastCal", "CalDue", "Mfr", "model", "SN", "MfrDevID"];
        setHiddenColumns(invisibleCols);
    } 

    const fetchData = ({pageIndex, pageSize}) => {
      console.log("fetchdata: ", pageIndex, '-', pageSize)
      MfcCalService.getLimitAll({pageIndex, pageSize})
      .then((res) => {
          data = res.data.cdmList
          columns = getColumns(data)
          pageCount = res.data.pages
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
      // fetchData(pageIndex, pageSize)
      /* MfcCalService.getLimitData(pageIndex, pageSize)
      .then((res) => {
      const cdmlist = res.data.cdmList;
      const data = cdmlist
      setPages(res.data.totalPages)
      setCDM(prevState => { return { cdm_data: data, cdm_columns: getColumns(data) }}) */
      // console.log(">>>DATA: ", data)
      }
    ,[pageIndex, pageSize])

  const handleRowSelected = (row, calID) => {
    //console.log(">>selectedRowID with CalID= ", calID)
    row.toggleRowSelected(false)
    row.isSelected? console.log("not seleted") : console.log(">>selectedRowID with CalID= ", calID) 
    !row.isSelected && handlePrintCert(calID)
  }
  // Render the UI for your table
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
                  {/* filter every columns */}
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
               /*  onClick= {() => {
                  console.log(">>selectedRowid: ", row.original.CalID )
                  row.toggleRowSelected(false)
                }} */
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {
                        // index === 0? //adding checkbox
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
      {/* debug code below */}
     {/*  <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
}
