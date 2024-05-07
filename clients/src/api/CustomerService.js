import http from './http-common'

const getAll = () => {
    return http.get("/customers")
}

const get = id => {
    return http.get(`/customers/${id}`)
}

const create = data => {
    return http.post("/customers", data)
};

const update = (id, data) => {
    return http.put(`/customers/${id}`, data)
}

const remove = id => {
    return http.delete(`/cusomters/${id}`)
}

const removeAll = () => {
    return http.delete(`/customers`)
}

const findByName = name => {
    return http.get(`/cusomters?name=${name}`)
}

export default{
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
} 