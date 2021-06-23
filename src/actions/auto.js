import {
    SET_OFFERS
} from "./types";

import AutoService from "../services/auto";

export const setOffers = () => async (dispatch) => {
    try {
        const res = await AutoService.getOffers();
        console.log('auto res ', res.data);  
        dispatch({
            type: SET_OFFERS,
            payload: res.data,
        });
    } 
    catch (err) {
      console.log(err);
    }
};