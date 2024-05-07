/* const data = [
    {
            "refFlow": "0.02047",
            "dutFlow": "0.01997",
            "deltaFlow": "-0.00051",
            "err": "-0.50550",
            "dutOutput": "19.96700",
            "status": "FAIL"
    },
    
    {
            "refFlow": "0.00549",
            "dutFlow": "0.00497",
            "deltaFlow": "-0.00052",
            "err": "-0.51730",
            "dutOutput": "4.97100",
            "status": "FAIL"
    },
    
    {
            "refFlow": "0.04067",
            "dutFlow": "0.03996",
            "deltaFlow": "-0.00071",
            "err": "-0.70790",
            "dutOutput": "39.96000",
            "status": "FAIL"
    }
    ] */
import React from 'react'   

        
const App = (data2)  => {
    const data = data2
    let myArr = []
    let keyArr = Object.keys(data)
    
    data.map((obj) => { 
            myArr.push(Object.values(obj))
    })
    console.log("myArray: ", myArr)
    let arr2 = []
    for(let i=0; i < myArr[0].length; i++){
            let colArr = []
            myArr.map((arr) => {
           colArr.push(arr[i])
    })
    arr2.push(colArr)
    }
    console.log("arr2: ", arr2)
    return arr2
}

export default App

/* export default function App(dataArray) {
    const data = dataArray
    let myArr = []
    
    data.map((obj) => { 
            myArr.push(Object.values(obj))
    })
    console.log("myArray: ", myArr)
    console.log("my first elem in myArr: ", myArr[0])
    let arr1 = []
    arr1 = myArr[0]
    console.log("length: ",  arr1.length) 
    let arr2 = []
    for(let i=0; i < myArr[0].length; i++){
            let colArr = []
            myArr.map((arr) => {
           colArr.push(arr[i])
    })
    arr2.push(colArr)
    }
    console.log("arr2: ", arr2)
    return arr2
//    return myArr
}
 */
//let result = App(data)
//console.log("result: ", result)
    
    