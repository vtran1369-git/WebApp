import http from './http-common'

const getAll = () => {
    return http.get("/mfc/all")
}

const get = id => {
    return http.get(`/mfc/${id}`)
}

const create = data => {
    return http.post("/newmfc", data)
};

const update = (id, data) => {
    return http.put(`/mfc/${id}`, data)
}

const remove = id => {
    return http.delete(`/mfc/${id}`)
}

const removeAll = () => {
    return http.delete(`/mfc`)
}

const findByName = name => {
    return http.get(`/mfc?name=${name}`)
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
}