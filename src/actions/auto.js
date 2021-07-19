import {
    SET_OFFERS,
    SET_SEARCH_GENERATIONS,
    SET_SEARCH_MODELS,
    SET_SEARCH_PARAMS
} from "./types";

import AutoService from "../services/auto";

// export const setOffers = (page, urlParams) => async (dispatch) => {
//     try {
//         const res = await AutoService.getOffers(page, urlParams);
//         dispatch({
//             type: SET_OFFERS,
//             payload: res.data,
//         });
//     } 
//     catch (err) {
//       console.log(err);
//     }
// };

export const setOffers = (page, urlParams) => (dispatch) => {
    return AutoService.getOffers(page, urlParams).then(
        data => {
            dispatch({
                type: SET_OFFERS,
                payload: data.data,
            });
            return Promise.resolve();
        },
        error => {
            console.log(error);
            return Promise.reject(error);
        }
    );
};

export const setSearchParams = () => (dispatch) => {
    return AutoService.getAllSearchParams().then(
        (data) => {
            console.log('success setSearchParams: ', data);
            dispatch({
                type: SET_SEARCH_PARAMS,
                payload: data.data,
            });

            return Promise.resolve(data.data);
        },
        (error) => {
            console.log('err setSearchParams: ', error);
            return Promise.reject();
        }
    );
};

// export const setSearchParams = () => async (dispatch) => {
//     try {
//       const res = await AutoService.getAllSearchParams();
  
//       dispatch({
//         type: SET_SEARCH_PARAMS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
// };

// export const setSearchModels = (markId) => async (dispatch) => {
//     try {
//       const res = await AutoService.getSearchModels(markId);
  
//       dispatch({
//         type: SET_SEARCH_MODELS,
//         payload: res.data.models,
//       });
//     } catch (err) {
//       console.log(err);
//     }
// };

export const setSearchModels = (markId) => (dispatch) => {
    return AutoService.getSearchModels(markId).then(
        (data) => {
            dispatch({
                type: SET_SEARCH_MODELS,
                payload: data.data.models,
            });
            return Promise.resolve(data.data);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
};

// export const setSearchGenerations = (modelId) => async (dispatch) => {
//   try {
//     const res = await AutoService.getSearchGenerations(modelId);

//     dispatch({
//       type: SET_SEARCH_GENERATIONS,
//       payload: res.data.generations,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const setSearchGenerations = (modelId) => (dispatch) => {
    return AutoService.getSearchGenerations(modelId).then(
        (data) => {
            dispatch({
                type: SET_SEARCH_GENERATIONS,
                payload: data.data.generations,
            });
            return Promise.resolve(data.data);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
  };