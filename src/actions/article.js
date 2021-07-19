import {
    SET_ARTICLE,
    CLEAR_ARTICLE
} from "./types";

import ArticleService from "../services/article";

export const getArticle = (id) => (dispatch) => {
    return ArticleService.getArticle(id).then(
      data => {
        dispatch({
          type: SET_ARTICLE,
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

export const clearArticle = () => ({
    type: CLEAR_ARTICLE,
});