import { 
    SET_ARTICLE, 
    CLEAR_ARTICLE
  } from "../actions/types";
  
  const initialState = {};
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SET_ARTICLE:
          return {...state, ...payload};

      case CLEAR_ARTICLE:
          return {};

      default:
          return state;
    }
  }