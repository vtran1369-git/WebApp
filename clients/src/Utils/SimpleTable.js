// import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

export default function App(props) {
    // const classes = useStyles();
    const data = props.rows
    const columns = props.columns

 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({ columns, data })

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

