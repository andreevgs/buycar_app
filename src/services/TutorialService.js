import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAll = () => {
  return axios.get(API_URL + "/news");
};

const getArticle = id => {
  return axios.get(API_URL + `/news/${id}`);
};

const create = data => {
  return axios.post(API_URL + "/news", data).then((response) => {
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
  getArticle,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default TutorialService;