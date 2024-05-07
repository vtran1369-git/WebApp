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
  },
});


export default function App(props) {
    const classes = useStyles();
    const rows = props.rows
    const colHeader = props.columns

    console.log("rows in table: ", rows)
    console.log("colum header: ", colHeader)

    if (!rows) {
      console.log("tble_header, rows is null")
      return <div>No Data Display</div>
    }
    else{
      return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" >
            <TableHead>
              <TableRow>
                {/*   { colHeader.map((header) => (
                      <TableCell align="center">{header}</TableCell>
                  ))} */}
                  <TableCell align="center">Mfgr</TableCell>
                  <TableCell align="center">Model</TableCell>
                  <TableCell align="center">SN</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Last Cal</TableCell>
                  <TableCell align="center">Cal Due</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, id) => (
                <TableRow key = {id}>
                  { 
                    Object.values(row).map((each) =>(
                      each.map((cell) => ( <TableCell align = "center">{cell}</TableCell> )
                    )))
                  }
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
    }
}
