import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getArticle = id => {
  return axios.get(API_URL + `/news/${id}`);
};

const ArticleService = {
    getArticle
};
  
export default ArticleService;