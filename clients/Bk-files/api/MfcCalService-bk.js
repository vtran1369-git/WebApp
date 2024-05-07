import http from './http-common'

const getAll = (recordCount) => {
    return http.get(`/mfccal/all/${recordCount}`)
}

const getLimitAll = (data) => {
    return http.post("/mfccal/limitall", data)
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
    loadCert
}
