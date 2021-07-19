import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAllSearchParams = () => {
    return axios.get(API_URL + "/cars/add");
  };
  
const getSearchModels = (markId) => {
    return axios.get(API_URL + "/cars/add?mark_id=" + markId);
};

const getSearchGenerations = (modelId) => {
    return axios.get(API_URL + "/cars/add?model_id=" + modelId);
};

const getOffers = (page, urlParams) => {
    if(urlParams){
        urlParams = urlParams.map((param) => {
            return param ? '/' + param : '';
        });
        urlParams = urlParams.join('');
    }
    else {
        urlParams = '';
    }

    return page ? axios.get(API_URL + "/cars" + urlParams + "?page=" + page) : axios.get(API_URL + "/cars" + urlParams);
};

const AutoService = {
    getOffers,
    getAllSearchParams,
    getSearchModels,
    getSearchGenerations
};
  
export default AutoService;