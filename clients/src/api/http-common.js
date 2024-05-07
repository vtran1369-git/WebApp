import axios from 'axios'
export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

// console.log("env: ", process.env)
console.log("env: ", process.env.REACT_APP_BASE_URL)

