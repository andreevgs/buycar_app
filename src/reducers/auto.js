import { 
  CLEAR_SEARCH_PARAMS, 
  SET_OFFERS, 
  SET_SEARCH_GENERATIONS, 
  SET_SEARCH_MODELS, 
  SET_SEARCH_PARAMS 
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OFFERS:
        return {...state, ...payload};

    case SET_SEARCH_PARAMS:
        return {...state, searchParameters: payload};

    case SET_SEARCH_MODELS:
        return {...state, searchParameters: {...state.searchParameters, models: payload}};

    case SET_SEARCH_GENERATIONS:
        return {...state, searchParameters: {...state.searchParameters, generations: payload}};

    case CLEAR_SEARCH_PARAMS:
        return {};
    default:
        return state;
  }
}