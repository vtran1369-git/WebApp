import http from './http-common'

const getAll = () => {
    return http.get("/addresses")
}

const get = id => {
    return http.get(`/addresses/${id}`)
}

const create = data => {
    return http.post("/addresses", data)
};

const update = (id, data) => {
    return http.put(`/addresses/${id}`, data)
}

const remove = id => {
    return http.delete(`/cusomters/${id}`)
}

const removeAll = () => {
    return http.delete(`/addresses`)
}

const findByName = name => {
    return http.get(`/cusomters?name=${name}`)
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