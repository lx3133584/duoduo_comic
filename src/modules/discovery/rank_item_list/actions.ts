import { createActions } from 'redux-actions';
import { fetchRankItemList } from 'api';

export const { getRankItemList } = createActions({
  GET_RANK_ITEM_LIST: [
    ({ id, page }) => {
      const promise = fetchRankItemList({ id, page });
      return { promise, data: { id } };
    },
    ({ page }) => ({ page }),
  ],
});
