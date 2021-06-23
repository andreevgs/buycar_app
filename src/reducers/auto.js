import { SET_OFFERS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OFFERS:
        return payload;
    default:
        return state;
  }
}