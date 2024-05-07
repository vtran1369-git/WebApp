import http from './http-common'

const getAll = (data) => {
    console.log("agitatorService: " + data)
    return http.post("/traveler/agitator/all", {data})
}

const getById = id => {
    return http.get(`/traveler/agitator/${id}`)
}

const create = data => {
    console.log("API posting data opID: ")
    console.log(data.opID)
    return http.post("/traveler/agitator/new", data)
};

const update = (id, data) => {
    console.log("agitator API update: ", id)
    console.log(data)
    return http.put(`/traveler/agitator/update/${id}`, data)
}

export default{
    getAll,
    getById,
    create,
    update,
  
} 

