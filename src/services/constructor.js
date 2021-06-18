import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAllParams = () => {
  return axios.get(API_URL + "/cars/add");
};

const getModels = (markId) => {
  return axios.get(API_URL + "/cars/add?mark_id=" + markId);
};

const ConstructorService = {
  getAllParams,
  getModels
};

export default ConstructorService;