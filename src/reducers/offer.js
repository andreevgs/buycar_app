import { 
    SET_OFFER, 
    CLEAR_OFFER
  } from "../actions/types";
  
  const initialState = {};
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SET_OFFER:
          return {...state, ...payload};

      case CLEAR_OFFER:
          return {};

      default:
          return state;
    }
  }