import { SET_PARAMS, SET_MODELS, SET_GENERATIONS, CLEAR_PARAMS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PARAMS:
        return payload;

    case SET_MODELS:
        return {...state, models: payload};

    case SET_GENERATIONS:
        return {
            ...state,
            generations: payload,
        };

    case CLEAR_PARAMS:
        return {};

    default:
        return state;
  }
}