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
    const numOfDevices = props.numOfDevices
    const isColHeader = props.isColHeader
    const colHeader = []

    colHeader.push(" ")
    if(numOfDevices > 0) {
      for(var i = 1; i < numOfDevices + 1; i++){
        colHeader.push(i)
      }
    }
   
    try{
      if(isColHeader) {
        let name = " "
        for(var i=1; i < rows[0]["HS"].length + 1; i++){
          i % 2 === 0 ? name="Leak" : name="Flow";
          colHeader.push(name)
        }
      }
    }catch(err){}
   /*  console.log(">>rows passed: ", rows)
    console.log(">>colHeader: ", colHeader) */
    // console.log(">>value: ", Object.values(props.rows[0])[0][0])
    if (!rows) {
      // console.log("TblnTemplate_noheader: rows is null")
      return <div>No Data Display</div>
    }
    else{
      //console.log(">>rows: ", rows)
      return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" >
          <TableHead>
            <TableRow>
              {colHeader.map( (each, index) => (
                // <TableCell align="center" style={{fontWeight: 'bold', width: '60px', paddingRight: '5px', paddingLeft: '5px'}} >{each}</TableCell>
                index === 0 ? <TableCell align="center" style={{fontWeight: 'bold', width: '60px', paddingRight: '5px', paddingLeft: '5px'}} >{each}</TableCell> : 
                <TableCell align="center" style={{fontWeight: 'bold', paddingRight: '5px', paddingLeft: '5px'}}>{each}</TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
            {rows.map(row => (
                // <TableRow key={row.name}>
                <TableRow key={Object.keys(row)}>
                <TableCell component="th" scope="row" align="center" style={{fontWeight: 'bold', paddingRight: '5px', paddingLeft: '5px'}}>
                  {Object.keys(row)}
                </TableCell> 
                {isColHeader ? 
                  Object.values(row)[0].map(each => (
                    <TableCell align="center" style={{background: (each === "P" ?  "green": "red")}}>{each}</TableCell>
                    )) :
                    Object.values(row)[0].map(each => (
                      <TableCell align="center">{each}</TableCell>
                      ))
                  }
                 
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
  }
}
