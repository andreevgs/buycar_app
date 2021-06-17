import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
  } from "../actions/types";
  
  const initialState = {};
  
  const tutorialReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_TUTORIAL:
        return {...state, tutorials: payload};
  
      case RETRIEVE_TUTORIALS:
        return payload;
  
      case UPDATE_TUTORIAL:
        return state.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_TUTORIAL:
        return state.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_TUTORIALS:
        return {};
  
      default:
        return state;
    }
  };
  
  export default tutorialReducer;