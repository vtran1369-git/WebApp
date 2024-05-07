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

function createData(name, value) {
  return { name, value };
}



/* const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]; */

export default function App(props) {
    const classes = useStyles();
    const rows = props.rows
    
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" >
            { isColHeader && 
              <TableHead>
              <TableRow>
                  <TableCell>Mfgr</TableCell>
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="right">SN</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Last Cal</TableCell>
                  <TableCell align="right">Cal Due</TableCell>
              </TableRow>
            </TableHead>
            }   
            <TableBody>
            { rows.map((row) => (
                <TableRow key={row.mfgr}>
                  <TableCell align="left">{row.mfgr}</TableCell>
                  <TableCell align="left">{row.model}</TableCell>
                  <TableCell align="left">{row.sn}</TableCell>
                  <TableCell align="left">{row.desc}</TableCell>
                  <TableCell align="left">{row.lastCal}</TableCell>
                  <TableCell align="left">{row.calDue}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
  );
}
