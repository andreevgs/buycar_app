import authHeader from "./auth-header";
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

const upload = (files, constructorData) => {
  let formData = new FormData();
  files.map((file) => {
    formData.append('files', file);
  });
  Object.keys(constructorData).forEach(function(key) {
    console.log(this[key]);
    formData.append(key, this[key]);
  }, constructorData)
  console.log('formdata: ', formData);
  return axios.post(API_URL + "/cars/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader()
    }
  })
}

const ConstructorService = {
  getAllParams,
  getModels,
  getGenerations,
  upload
};

export default ConstructorService;