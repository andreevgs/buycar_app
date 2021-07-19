import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    SET_ARTICLE,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
    SET_MESSAGE
  } from "./types";
  
  import TutorialDataService from "../services/TutorialService";
  
  export const create = (title, description, cover, content) => (dispatch) => {
    return TutorialDataService.create({title, description, cover, content}).then(
      (data) => {
        return Promise.resolve();
      },
      (error) => {
        console.log('err in create action: ', error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
};

  export const createTutorial = (title, description) => async (dispatch) => {
    try {
      const res = await TutorialDataService.create({ title, description });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveTutorials = () => (dispatch) => {
      return TutorialDataService.getAll().then(
        data => {
          dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: data.data,
          });
          console.log('dataaa: ', data.data);
          return Promise.resolve(data.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
  };
  
  export const updateTutorial = (id, data) => async (dispatch) => {
    try {
      const res = await TutorialDataService.update(id, data);
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteTutorial = (id) => async (dispatch) => {
    try {
      await TutorialDataService.remove(id);
  
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllTutorials = () => async (dispatch) => {
    try {
      const res = await TutorialDataService.removeAll();
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
      const res = await TutorialDataService.findByTitle(title);

    } catch (err) {
      console.log(err);
    }
  };