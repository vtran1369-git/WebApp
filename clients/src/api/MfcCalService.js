import http from './http-common'
import authHeader from './auth-header'

const getAll = (recordCount) => {
    return http.get(`/mfccal/all/${recordCount}`)
}

const getByWO= (data) => {
    // console.log(`data from getByWO IS ${data}`)
    return http.post("/mfccal/getByWO", { data: data })
}

const getBySN= (data) => {
    console.log(`data from getBySN IS ${data}`)
    return http.post("/mfccal/getBySN", { data: data })
}

/* const getLimitAll = (data) => {
    return http.post("/mfccal/limitall", { data: data, headers: authHeader() })  
}
 */
const getLimitAll = (data) => {
    return http.post("/mfccal/all", {data:data})
}

const getById = id => {
    return http.get(`/mfccal/onebyid/${id}`)
}

const create = data => {
    return http.post("/mfccal", data)
};

const update = (id, data) => {
    return http.put(`/mfccal/update/${id}`, data)
}

const remove = id => {
    return http.delete(`/mfccal/${id}`)
}

const removeAll = () => {
    return http.delete(`/mfccal`)
}

const findByName = name => {
    return http.get(`/mfccal?name=${name}`)
}

/*** equiptment calibration */
/* const getAllEquipCal = () => { 
    return http.post("mfccal/cert/equipment/all", {headers: authHeader() })
    // return http.get("mfccal/cert/equipment/all", {headers: authHeader() })
} */

const getAllEquipCal = () => { 
    return http.get("mfccal/cert/equipment/all")
}

const updateEquipCal = (id, data) => {
    return http.put(`/mfccal/cert/equipment/update/${id}`, data)
}

const loadCert = (id) => {
    return  http.get(`/mfccal/cert/equipment/download/${id}`, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
}


async function getCertByID(id) {
    console.log("getcertByID: ", id)
    return http.get(`/mfccal/cert/getcert/${id}`);
  }

async function getDataReportByID(id) {
    return http.get(`/mfccal/cert/getreport/${id}`);
}

export default {
    getAll,
    getLimitAll,
    getById,
    create,
    update,
    remove,
    removeAll,
    findByName,
    getCertByID,
    getDataReportByID,
    getAllEquipCal,
    updateEquipCal,
    loadCert,
    getByWO,
    getBySN
}
