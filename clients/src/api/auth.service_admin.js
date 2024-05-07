import axios from "axios";
import {removeLocalCDMList} from '../Utils/locStorage'

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = process.env.REACT_APP_BASE_URL + "/auth/";
console.log("env->APP_BASE:  ", process.env.REACT_APP_BASE_URL)
const register = (role, firstname, lastname, username, email, password) => {
  //console.log(">>>username: ", username)
  const body = {role: role, firstname: firstname, lastname: lastname, username: username, email: email, password: password}
  //console.log("body: ", body)
  return axios.post(API_URL + "signup", body /* {
    username,
    email,
    password,
  } */);
};

const update = (role, firstname, lastname, username, email, password) => {
  //console.log(">>>username: ", username)
  const body = {role: role, firstname: firstname, lastname: lastname, username: username, email: email, password: password}
  //console.log("body: ", body)
  return axios.post(API_URL + "update", body )
};


const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(">>auth.service_admine: login responsed: ", response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  // console.log("log out..!");
  //console.log("localstorage items: ", JSON.parse(localStorage.getItem("cdm")));
  localStorage.removeItem("user");
  removeLocalCDMList();
  /* localStorage.removeItem("cdm"); //from CDMList
  localStorage.removeItem("pages"); //CDMList.js
  localStorage.removeItem("pageindex"); */
  //console.log("removed ", JSON.parse(localStorage.getItem("cdm")))
};

const getCurrentUser = () => {
  //console.log("getUser: ", JSON.parse(localStorage.getItem("user")));
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  update
};
