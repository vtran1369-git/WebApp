
const path = require('path');

console.log((path.join(__dirname, "./clients/build")))
/* var dt = "2021-09-30T22:12:14.000Z"
var newdt1 = new Date(Date.parse(dt))
var newdt = new Date(dt).toLocaleString("en-US", { timeZone: 'America/Los_angeles'})
console.log("newdt1 ",newdt1)
console.log(newdt.toLocaleString())
var mydate = new Date()
console.log("mydate: ", mydate)
console.log("parse: ", Date.parse(mydate))
console.log("mydate locale: ", mydate.toLocaleString("en-US", {timeZone:'America/Los_angeles' }))
var convDate = mydate.toLocaleString("en-US", {timeZone:'America/Los_angeles' })
console.log(Date.parse(convDate))

const timeStamp = () => {
    function pad(n) {return n<10 ? "0"+n : n}
    d=new Date()
    dash="-"
    colon=":"
    return d.getFullYear()+dash+
    pad(d.getMonth()+1)+dash+
    pad(d.getDate())+" "+
    pad(d.getHours())+colon+
    pad(d.getMinutes())+colon+
    pad(d.getSeconds())
}

console.log("timestamp: ", timeStamp())

    const objArray = [
        {
            "Test Item": "Supply Pressure",
            "Test ID": "TFPT-0.5",
            "Data": "41.713809967041016",
            "Units": "psi",
            "Min": 35,
            "Max": 45,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "High Press Sensors",
            "Test ID": "TFPT-0.7",
            "Data": "0.04,-0.06,-0.05",
            "Units": "psi",
            "Min": -1,
            "Max": 1,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Low Press Sensors",
            "Test ID": "TFPT-0.8",
            "Data": "-0.007,-0.041,-0.029",
            "Units": "psi",
            "Min": -0.2,
            "Max": 0.2,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "PCB Serial Number",
            "Test ID": "TFPT-1.1",
            "Data": "H11232847100237",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Factory EPROM",
            "Test ID": "TFPT-1.2",
            "Data": "5729",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "FAIL"
        },
        {
            "Test Item": "CPLD Configuration",
            "Test ID": "TFPT-1.4",
            "Data": "12",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Firmware",
            "Test ID": "TFPT-1.5",
            "Data": "11",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "FAIL"
        },
        {
            "Test Item": "485 COM Check",
            "Test ID": "TFPT-1.6",
            "Data": "Addr=72",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "TCPIP COM Check",
            "Test ID": "TFPT-1.7",
            "Data": "222.222.0.72",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Manifold Serial Number",
            "Test ID": "TFPT-1.8",
            "Data": "",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "MFC Config Readback",
            "Test ID": "TFPT-2.1",
            "Data": "AD2-OD5-CD2-000-000-000",
            "Units": "N/A",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Compound Leak Down",
            "Test ID": "TFPT-3.1",
            "Data": "[SP2]=-0.0179",
            "Units": "psi/min",
            "Min": -0.3,
            "Max": 0.5,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Chan Max Flow",
            "Test ID": "TFPT-3.3",
            "Data": "[M1a]=99.8%",
            "Units": "10*Flow%",
            "Min": 800,
            "Max": 1200,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Compound Leak Through",
            "Test ID": "TFPT-3.4",
            "Data": "[SP1]=0.0077",
            "Units": "psi/min",
            "Min": -0.1,
            "Max": 0.02,
            "Pass/Fail": "PASS"
        },
        {
            "Test Item": "Chan Output Leak",
            "Test ID": "TFPT-3.7",
            "Data": "",
            "Units": "psi/min",
            "Min": 0,
            "Max": 0,
            "Pass/Fail": "PASS"
        }
    ]
    let selArrIndx = []
    console.log("length of ojbArr: ", objArray.length)
    let delArray = objArray.splice(4, 3)
    let pfName = " "
    let failCnt = 0
    delArray.forEach((item, idx) => {
        item["Pass/Fail"] === "FAIL" && item["Test Item"] === "Factory EPROM" ? (delArray[2]["Data"] = "FactEE Fail", delArray[2]["Pass/Fail"] = "FAIL", failCnt++): 
        item["Pass/Fail"] === "FAIL" && item["Test Item"] === "CPLD Configuration" ? (delArray[2]["Data"] = "CPLD Fail" , delArray[2]["Pass/Fail"] = "FAIL", failCnt++) : 
        item["Pass/Fail"] === "FAIL" && item["Test Item"] === "Firmware" ? (delArray[2]["Data"] = "FW Fail" , delArray[2]["Pass/Fail"] = "FAIL", failCnt++) : delArray[2]["Data"] = "No Fail"
    })
    
    console.log("total failed: ", failCnt)
    if (failCnt > 1) {
        delArray[2]["Data"] = "Multi Fail"
    } 
    console.log(">>delArray: ", delArray)
 
    
   
 */