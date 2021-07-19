import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getOfferData = (urlParams) => {
    if(urlParams){
        urlParams = urlParams.map((param) => {
            return param ? '/' + param : '';
        });
        urlParams = urlParams.join('');
    }
    else {
        urlParams = '';
    }

    return axios.get(API_URL + "/cars" + urlParams);
};

const OfferService = {
    getOfferData
};
  
export default OfferService;