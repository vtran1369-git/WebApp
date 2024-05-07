import { useTable } from 'react-table';
import convertObj from '../Utils/AddKeyToValObj'

export default function App(props) {
    // const classes = useStyles();
    console.log("SimpleTble-noheader: ", props)
    const dataRows = props.rows
    
    console.log("SimpleTble-noheader: ", dataRows)
    const data = convertObj(dataRows)

    const columns = (data) => {
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

    const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    } = useTable({ columns, data })

    return (
        <>
        {/* <table {...getTableProps()} className={classes.table} size="small"> */}
        <table {...getTableProps()} className = "simple-table" size="small">
            <thead>
            {/* {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} >
                        {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))} */}
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

