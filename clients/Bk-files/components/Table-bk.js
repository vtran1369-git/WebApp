import React, { useEffect, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import { Link, NavLink, Redirect } from 'react-router-dom';

export default function Table({ columns, data, onclick }) {
  const [filterInput, setFilterInput] = useState("");
  //const pageSizeOptions = [10,20,30,40]
  // Use the state and functions returned from useTable to build your UI

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
        placeholder={`Type to search...`}
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
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    //allColumns,
    setHiddenColumns,
    //just added for selection
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      defaultColumn,
      autoResetHiddenColumns: false,
    },
    useFilters,
    useSortBy,
    usePagination,
    //just added to work on row selection
    useRowSelect,
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("wo_num", value);
    setFilterInput(value);
  };

  const setHiddenCols = () =>{
    const invisibleCols = ["CalID", "MFCID", "MatBatch", "Comments", "Added", "LastCal", "CalDue", "Mfr", "model", "SN", "MfrDevID"];
    setHiddenColumns(invisibleCols);
  } 

  useEffect(() => {
    setHiddenCols()
  },[])

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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {
                        index === 0? 
                          // <NavLink className="Nav_link" to={"/mfc/"+ row.original.CalID} id={row.original.CalID}>{cell.render("Cell")}</NavLink>
                          <Link onClick={() => onclick(row.original.CalID)}
                           /*  to = {{
                              pathname: "/mfccal/",
                              state: {id: row.original.CalID}
                            }} */
                         >{cell.render("Cell")}
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
