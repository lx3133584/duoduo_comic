import { createActions } from 'redux-actions';
import {
  fetchFavoritesList, fetchHistoryList, deleteHistory,
  deleteImage,
} from 'api';

export const {
  getFavoritesList, getHistoryList, removeHistory,
  removeDownloadComic, removeDownloadComicFulfilled,
  removeDownloadContent, removeDownloadContentFulfilled,
  removeDownloadImg,
} = createActions({
  GET_FAVORITES_LIST: fetchFavoritesList,
  GET_HISTORY_LIST: async (page) => {
    const result = await fetchHistoryList(page);
    return { result, page };
  },
  REMOVE_HISTORY: (id) => {
    const promise = deleteHistory(id);
    return { promise, data: id };
  },
  REMOVE_DOWNLOAD_COMIC: id => id,
  REMOVE_DOWNLOAD_COMIC_FULFILLED: id => id,
  REMOVE_DOWNLOAD_CONTENT: ({ comic_id, id }) => ({ comic_id, id }),
  REMOVE_DOWNLOAD_CONTENT_FULFILLED: ({ comic_id, id }) => ({ comic_id, id }),
  REMOVE_DOWNLOAD_IMG: path => deleteImage(path),
});
