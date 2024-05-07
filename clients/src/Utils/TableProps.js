import { Link } from 'react-router-dom'
import React, { useEffect } from 'react';
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";
import '../Form.css'

export default function App({columns, data, hiddenCols, onclick, handleClicked }) {
  // const [clicked, setClicked] = useState(false)

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
          resolvedRef.current.indeterminate = indeterminate
          }, [resolvedRef, indeterminate])
      
          return (
          <>
              {/* <input type="checkbox" ref={resolvedRef} {...rest} /> */}
              <input type="radio" ref={resolvedRef} {...rest} /> 
          </>
          )
      }
  )

  const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  setHiddenColumns,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize },
  } = useTable({ 
      columns, 
      data,
      initialState: { pageIndex: 0, pageSize: 10},
      defaultColumn,
      autoResetHiddenColumns: false,
      autoResetSelectedRows: false
  },
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
  hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          Header: <div>eTraveler</div>,
          Cell: ({ row, toggleAllRowsSelected, toggleRowSelected }) => {                      
            const currentState = row.getToggleRowSelectedProps();
            // console.log("selection-currentstate: ", currentState)
            return (
              <div>
                {/* eTraveler */}
                <IndeterminateCheckbox
                  {...currentState}
                  onClick={() => {
                    toggleAllRowsSelected(false);
                    toggleRowSelected(row.id, !currentState.checked);
                    onclick(row)
                  }} 
                />
              </div>
            )
        }},
        ...columns
      ]);
  }
  )

 /*  const setHiddenCols = () =>{
      // const invisibleCols = ["IDcalEquip", "CertID"];
      setHiddenColumns(hiddenCols);
    }  */

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

  useEffect(() =>{
    setHiddenColumns(hiddenCols);
      //setHiddenCols()
  },[]) 
  
  return (
      <>
      {/* <table {...getTableProps()} className={classes.table} size="small"> */}
      <table {...getTableProps()} className = "tflist-table" size="small">
              <thead>
              {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                          column.isSorted
                          ? column.isSortedDesc
                            ? "sort-desc" : "sort-asc" : ""   
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
          {page.map(row => {
          prepareRow(row)
          return (
              <tr {...row.getRowProps()} 
                  className={`tr ${row.isSelected? 'selected': ''}`}
                  // onClick = {() => onclick(row)}
              >
                    {row.cells.map( (cell, index) => {
                  return (
                      <td {...cell.getCellProps()}  >
                        {
                          index === 1 ? 
                          // <Link className={ `${clicked && 'link-selected'} ` } 
                          <Link 
                            onClick = { () => {
                              // setClicked(true)
                              handleClicked(row)
                            }}
                          >
                              {cell.render('Cell')}
                          </Link>
                          : cell.render("Cell")
                        }
                      </td>
                  )
                  })}
                  {/*  {row.cells.map(cell => {
                  return (
                      <td {...cell.getCellProps()} >
                          {cell.render('Cell')}
                      </td>
                  )
                  })} */}
              </tr>
          )
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

