import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  console.log(">>>username: ", username)
  const body = {username: username, email: email, password: password}
  console.log("body: ", body)
  return axios.post(API_URL + "signup", body /* {
    username,
    email,
    password,
  } */);
};

const login = (username, password) => {
  console.log(">>login: ", username, '-', password)
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log("Logging out...")
};

const getCurrentUser = () => {
  console.log("getUser: ", JSON.parse(localStorage.getItem("user")));
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
