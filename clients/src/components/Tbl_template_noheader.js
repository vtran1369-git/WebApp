import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    // fontSize: 15,
  },
  tableRow: {
    // height: 25,
    paddingTop: 3,
    paddingBottom: 3,
  }
});

export default function App(props) {
    const classes = useStyles();
    const rows = props.rows
    console.log(">>rows passed: ", rows)
    if (!rows) {
      // console.log("TblnTemplate_noheader: rows is null")
      return <div>No Data Display</div>
    }
    else{
      return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" >
            <TableBody>
            {rows.map((row) => (
                // <TableRow key={row.name}>
                <TableRow className={classes.tableRow} key={Object.keys(row)} >
                <TableCell component="th" scope="row">
                  {Object.keys(row)}
                </TableCell> 
                <TableCell align="left">{Object.values(row)}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
  }
}
