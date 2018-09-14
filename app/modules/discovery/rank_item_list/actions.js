import { createActions } from 'redux-actions';
import { fetchRankItemList } from 'api';

export const { getRankItemList } = createActions({
  GET_RANK_ITEM_LIST: [
    ({ type, page }) => {
      const promise = fetchRankItemList({ type, page });
      return { promise, data: { type } };
    },
    ({ page }) => ({ page }),
  ],
});
