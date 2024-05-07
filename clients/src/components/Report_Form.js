import React, { useState, useEffect, useRef } from 'react'
import {Grid, OutlinedInput} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Table_noheader from './Tbl_template_noheader'
import logo from '../views/logo.png'
import SimpleTable from '../Utils/SimpleTable'
import DisplayChart from './DisplayCharts'
import PrintPage from './PrintPage';

const useStyles = makeStyles({
    table: {
      minWidth: 50,
    },
  });

const getColumns = (data) => {
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
  
export default function App(props) {
    const divPrint = useRef(null)
    //const certData = props.value
    /* console.log(">>propsval: ")
    console.log(props.value) */
    // console.log("reportform-passed props: ", props)
    const data = props.value
    const reportData = props.reportData
   /*  console.log("in reportForm, props.value: ", data)
    console.log("in ReportForm, reportData: ", reportData) */
    const asFoundLeft = data["As F/L"]

    let columns = []
    if(reportData){
        columns = getColumns(reportData)
    }
  
    const opdate_rows = [
        { "Date" : data.CalDate},
        { "Operator" : data.TechName}
    ]
     
    let dutAddr = data.Address
    let ficName = null
    if(dutAddr > 19) {
        ficName = 'FIC-${dutAddr}-19'
    }else ficName = 'FIC-None'

    const dut_rows = [
        { "Manufacturer" : data.DUTmfr },
        { "Model" : data.DUTmodel },
        { "SN" : data.DUTsn },
        { "Flow Range" : data.DUTFlowRange },
        { "Output Range" : data.DUTOutputRange },
        { "Tolerance" : data.DUTtolerance },
        { "Process Gas" : data.DUTProcGas },
        { "K-Factor" : data["K-Factor"] },
        { ficName : data.Address},
    ]

    const ref_rows = [
        { "Manufacturer" : data.DigMeterMfr },
        { "Model" : data.DigMeterModel },
        { "SN" : data.DigMeterSN },
        { "Range" : data.BlocRange },
        { "Reference 2 SN" : data.BlocSN },
        { "Supply Pressure" : data.SuppPress },
        { "Test Gas" : data.TestGas },
        { "Customer" : data.CustomerName } 
       
    ]

    const refFlow = reportData.map( (row) => {
        return row["Ref Flow"]
    })

    const fsErr = reportData.map( (row) => {
       return row["Error (%fs)"]
    })
   
    let flowRangeStr, toleranceStr = ""
    flowRangeStr = data.DUTFlowRange
    toleranceStr = data.DUTtolerance
    
    let flowRangeArr = flowRangeStr.split(' ')
    let toleranceArr = toleranceStr.split(' ')
    console.log(`dutFlowrange: ${data.DUTFlowRange} - flowRangeArr is ${flowRangeArr}`)
    // console.log("flowArr TolArr: ", flowRangeArr, ' ', toleranceArr)
    let fullScale = flowRangeArr.length < 3 ? flowRangeArr[0] : flowRangeArr[2]
    // const fullScale = flowRangeArr[2]
    const offSet = toleranceArr[0]
    const scaleFactor = toleranceArr[3]
    const hiLim = refFlow.map( x => (x * scaleFactor / fullScale + parseFloat(offSet)).toFixed(5) )
    const hiData = refFlow.map( x =>  {
        let y = x * scaleFactor / fullScale
        y = y + parseFloat(offSet)
        return y
    })
    const loLim = hiLim.map( x =>  x * (-1.0))
    const Header = `Report Of Calibration - ${asFoundLeft}`
    console.log(`scalefactor: ${scaleFactor} - fullscale: ${fullScale}-reflow: ${refFlow}`)
    return (
        <>
            <Grid container xs="12">
                <Grid container xs="12" className="form-main" spacing={0} direction="row" justify="left" alignItems="stretch" style={{paddingLeft: "0px"}}>
                    <Grid ref={divPrint} item xs={12} className="form-container cert" id="report-form" style={{ fontSize: "12px" }}>
                        <Grid container xs="12" spacing={0} direction="row" justify="left" alignItems="stretch">
                            <Grid item xs={8} className="form-control cert-top" >
                                <img src={logo} alt="Company logo" />
                            </Grid>
                        </Grid>
                        <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch" style={{marginTop: "5px"}}>
                            <Grid item xs={8}  className="form-control cert-header report" >    
                                <h2>{Header}</h2>
                                {/* <h2>Report Of Calibration - AS LEFT</h2> */}
                            </Grid>
                            <Grid item xs={4}  className="form-control"> 
                                <Grid container spacing={0} className="grid-line">
                                    <Table_noheader rows={opdate_rows} />
                                </Grid>  
                            </Grid>
                        </Grid> 
                        <Grid container xs="12" spacing={0} direction="row" justify="center" alignItems="stretch">
                            <Grid item xs={6} className="cert-label" >DUT</Grid><Grid xs={6} className="cert-label" >Reference</Grid>
                            <Grid item xs={6}  className="form-control" > 
                                <Grid container xs="12" className="grid-line" >
                                    <Table_noheader rows= {dut_rows} />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}  className="form-control"> 
                                <Grid container xs="12" className="grid-line">
                                    <Table_noheader rows = {ref_rows} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="cert-label standard">Calibration Data</Grid>
                        <Grid container xs="12" className="grid-line" >
                            <SimpleTable rows= {reportData} columns={columns} />
                        </Grid>
                        <Grid item xs={12} className="cert-label standard">%FS Error vs. Reference Flow</Grid>
                        <Grid container xs="12" className="grid-line" >
                            < DisplayChart xLabels={refFlow} yData={fsErr} yHiLim={hiLim} yLoLim={loLim} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <PrintPage pageName="PRINT REPORT" divRef = {divPrint} />
                    </Grid>
                </Grid>
                
            </Grid>
        </>
    )
}

