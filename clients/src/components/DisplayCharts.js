import { blue, blueGrey, green, yellow } from "@material-ui/core/colors";
import React from "react";
import { Line } from "react-chartjs-2";

export default function App(props) {
    const xLabels = props.xLabels
    const dataFSErr = props.yData
    
    const hiLimit = props.yHiLim
    const lowLimit = props.yLoLim
    console.log("hiLmit: ", hiLimit)
    const len = hiLimit.length
    const maxValue = hiLimit[len - 1]
    const minValue = (-1.0) * maxValue
    console.log("lengh: ", maxValue)
    console.log("xLabels & data: ", xLabels, ' ', dataFSErr)
    const data = {
        labels: xLabels,
        datasets: [
            {
              label: "%FS Error",
              data: dataFSErr,
              fill: false,
              borderColor:"#742774" /*"rgba(75,192,192,1)"*/
            },
            {
              label: "Limit High",
              data: hiLimit,
              fill: false,
              borderColor:  'rgba(220,180,0,1)', /*"rgba(75,192,192,1)" */
              borderDash: [2,2]
            },
            {
              label: "Limit Low",
              data: lowLimit,
              fill: false,
              borderColor: 'rgba(220,180,0,1)', /*"rgba(220,220,220,1)", */
              borderDash: [2,2]
            },
        ]
    }
    
    const options = {
      title: {
        display: true,
        text: "Chart Title"
      },
      scales: {
        yAxes: [
          { 
            ticks: {
              beginAtZero: false,
              min: minValue,
              max: maxValue,
              stepSize: 0.0001
            }
          }
        ]
      },
      plugins: {
          legend: {
          display: true,
          position: "right"
          }
      },
      maintainAspectRatio: false
    }
    return (
        // <div className="chart" style={{ width: '800px', height: '295px' }} >
        <div className="chart" style={{ width: '800px', height: '270px' }} >
           <Line data={data} options={options} />
        </div>
    );
}