import authHeader from './auth-header'
import http from './http-common'

/* const getLimitAll = (data) => {
    return http.post("/traveler/truflow/limitall", data)
} */

const getTFLbySN = (data) => {
    console.log("TFLbySN: ", data)
    return http.post("/traveler/truflow/gettflbysn", {data: data})
}

const getLimitAll = (data) => {
    // return http.post("/traveler/truflow/limitall", {data: data, headers: authHeader() })
    return http.post("/traveler/truflow/limitall", {data: data})
}

const getTravelerByFSN = (fsn) => {
    return http.get(`/traveler/truflow/onebyid/${fsn}`)
}

const getMFCsByFSN = (fsn) => {
    return http.get(`/traveler/truflow/mfcs/${fsn}`)
}

const updateTestEventRegistryById = (testId, data) => {
    console.log("api>>updatetest: ", testId, '-', data)
    return http.put(`/traveler/truflow/test/${testId}`, data)
}

export default {
    getLimitAll,
    getTravelerByFSN,
    getMFCsByFSN,
    updateTestEventRegistryById,
    getTFLbySN
}
