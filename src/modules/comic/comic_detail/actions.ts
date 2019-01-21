import { createActions } from 'redux-actions';
import {
  fetchComicDetail, fetchComicList, postFavorite, deleteFavorite, postScore,
} from 'api';

export const {
  getComicDetail, getComicList,
  addFavorite, removeFavorite, addScore,
  useTheDetailCache, useTheListCache,
  updateTheDetailCache, updateTheListCache,
} = createActions({
  GET_COMIC_DETAIL: fetchComicDetail,
  GET_COMIC_LIST: fetchComicList,
  ADD_FAVORITE: (id) => {
    const promise = postFavorite(id);
    return { promise, data: id };
  },
  REMOVE_FAVORITE: (id) => {
    const promise = deleteFavorite(id);
    return { promise, data: id };
  },
  ADD_SCORE: ({ id, score }) => {
    const promise = postScore({ id, score });
    return { promise, data: { id, score } };
  },
  USE_THE_DETAIL_CACHE: f => f,
  USE_THE_LIST_CACHE: f => f,
  UPDATE_THE_DETAIL_CACHE: f => f,
  UPDATE_THE_LIST_CACHE: f => f,
});
