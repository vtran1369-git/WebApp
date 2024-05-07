import { useTable, useRowSelect } from 'react-table';
import React from 'react';

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
    const data = props.rows
    const cols = props.columns
    const onselect_printCert = props.onselect_printCert
    const columns = getHeader(cols)

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

