import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getOffers = (page) => {
    return page ? axios.get(API_URL + "/cars?page=" + page) : axios.get(API_URL + "/cars");
};


const AutoService = {
    getOffers
  };
  
  export default AutoService;