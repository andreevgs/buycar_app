import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAll = () => {
  return axios.get(API_URL + "/tutorials");
};

const get = id => {
  return axios.get(API_URL + `/tutorials/${id}`);
};

const create = data => {
  return axios.post(API_URL + "/tutorials", data).then((response) => {
    console.log('create res: ', response);
    return response.data;
  });
};

const update = (id, data) => {
  return axios.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return axios.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return axios.delete(`/tutorials`);
};

const findByTitle = title => {
  return axios.get(`/tutorials?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default TutorialService;