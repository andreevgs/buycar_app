import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAllParams = () => {
  return axios.get(API_URL + "/cars/add");
};

const getModels = (markId) => {
  return axios.get(API_URL + "/cars/add?mark_id=" + markId);
};

const getGenerations = (modelId) => {
  return axios.get(API_URL + "/cars/add?model_id=" + modelId);
};

const ConstructorService = {
  getAllParams,
  getModels,
  getGenerations
};

export default ConstructorService;