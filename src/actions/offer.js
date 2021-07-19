import {
    SET_OFFER,
    CLEAR_OFFER
} from "./types";

import OfferService from "../services/offer";

export const setOffer = (urlParams) => (dispatch) => {
    return OfferService.getOfferData(urlParams).then(
        data => {
            dispatch({
                type: SET_OFFER,
                payload: data.data,
            });
            return Promise.resolve(data.data);
        },
        error => {
            console.log(error);
            return Promise.reject(error);
        }
    );
};

export const clearOffer = () => ({
    type: CLEAR_OFFER,
});