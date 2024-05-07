import React, { useEffect, useRef, useState } from "react";
import { useTable, usePagination, useFilters, useSortBy, useRowSelect } from "react-table";

function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    onselected    
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

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef
    
        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])
        return (
            <>
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
        useRowSelect,
        hooks => {
        hooks.visibleColumns.push(columns => [
            {
                id: 'selection',
                Header: <div>Show List</div>,
                Cell: ({ row, toggleAllRowsSelected, toggleRowSelected }) => {                      
                  const currentState = row.getToggleRowSelectedProps();
                  // console.log("selection-currentstate: ", currentState)
                  return (
                    <div>
                      <IndeterminateCheckbox
                        {...currentState}
                        onClick={() => {
                          toggleAllRowsSelected(false);
                          toggleRowSelected(row.id, !currentState.checked);
                          onselected(row)
                        }} 
                      />
                    </div>
                  )
              }},
            ...columns,
        ])
        }
    )

    useEffect(() => {
        fetchData({ pageIndex, pageSize })
      }, [fetchData, pageIndex, pageSize])

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
                    >
                        {row.cells.map((cell, index) => {
                          return (
                            <td {...cell.getCellProps()} style = {index === 1 ? {fontWeight: "bold"}:{fontWeight: "normal"}}
                            >
                            {
                              /*   index === 1 ? 
                                <Link 
                                    onClick = { () => {
                                    linkclicked(row)
                                    }}
                                >
                                    {cell.render('Cell')}
                                </Link>
                                : */ 
                                cell.render("Cell")
                            }
                            </td>
                            )
                        })}
                    </tr>
                    );
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
          {[20, 30, 40, 50, 60].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>   
    )
}

export default Table