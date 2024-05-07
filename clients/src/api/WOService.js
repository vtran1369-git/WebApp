import http from './http-common'

const getAll = (data) => {
    console.log("api/workorder/all: ", {data})
    return http.post(`/workorder/all`, {data: data})
}

async function getByWOID(id){
    console.log("woID: ", id)
    return http.get(`/workorder/${id}`)
}


export default {
    getAll,
    getByWOID
} 