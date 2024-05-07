//import data from "../Components/TestData";
import http from './http-common'

const fetch = require('node-fetch')


const url = '/api/workorder/onebyid/:id';
const baseURL = 'http://localhost:8080';

export async function getAllCustomers() {
    return http.get('/customer/all');
}

export async function getAllOrders() {
    return http.get('/workorder/all');
}

export async function getOrderById() {
    console.log("getting orderbyID ...")
    return  http.get('/workorder/onebyid/:id');
   /*  http.get('/workorder/onebyid/:id')
    .then((res) =>{
        console.log(res.data);
        return (res.data.work_order)
    }
    ) */
   /*  const response = await fetch('/api/workorder/onebyid/:id', baseURL);
    console.log(response)
    return await response.json(); */
}

//const url = '/api/workorder/onebyid/15';

/* const testURL = '/api/workorder/onebyid/15';
const getData = async (testURL) => {
    try{
        const res = await fetch('http://localhost:8080/api/workorder/onebyid/15')
        console.log('>>>>>>');
        console.log(res);
        const json = await res.json();
        console.log(json);
    }catch(err){ console.log(err)}
}
 */
//getData(testURL);