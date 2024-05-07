import authHeader from './auth-header'
import http from './http-common'

const getById = id => {
    return http.get(`/people/onebyid/${id}`)
}

const getManyByIds = data => {
    console.log("api ids: ", data)
    return http.post(`people/manybyids/`, {data: data})
}
export default {
     getById,
     getManyByIds
}
