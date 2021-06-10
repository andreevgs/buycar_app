import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (name, phone, email, password) => {
    console.log('reg data: ', [name, phone, email, password]);
    return axios.post(API_URL + "signup", {
        name,
        phone,
        email,
        password,
    }).then((response) => {
        console.log('reg res: ', response);
        return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
        email,
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
};

export default {
    register,
    login,
    logout,
};