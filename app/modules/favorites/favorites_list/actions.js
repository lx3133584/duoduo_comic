import { createActions } from 'redux-actions';
import { fetchFavoritesList, fetchHistoryList, deleteHistory } from 'api';

export const { getFavoritesList, getHistoryList, removeHistory } = createActions({
  GET_FAVORITES_LIST: async () => {
    const result = await fetchFavoritesList();
    return result;
  },
  GET_HISTORY_LIST: async (page) => {
    const result = await fetchHistoryList(page);
    return { result, page };
  },
  REMOVE_HISTORY: (id) => {
    const promise = deleteHistory(id);
    return { promise, data: id };
  },
});
