import {
    SET_PARAMS,
    SET_MODELS,
    SET_GENERATIONS,
    CLEAR_PARAMS,
} from "./types";
  
import ConstructorDataService from "../services/constructor";

export const setParams = () => async (dispatch) => {
    try {
      const res = await ConstructorDataService.getAllParams();
  
      dispatch({
        type: SET_PARAMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

export const setModels = (markId) => async (dispatch) => {
    try {
      const res = await ConstructorDataService.getModels(markId);
  
      dispatch({
        type: SET_MODELS,
        payload: res.data.models,
      });
    } catch (err) {
      console.log(err);
    }
};

export const setGenerations = (modelId) => async (dispatch) => {
  try {
    const res = await ConstructorDataService.getGenerations(modelId);

    dispatch({
      type: SET_GENERATIONS,
      payload: res.data.generations,
    });
  } catch (err) {
    console.log(err);
  }
};