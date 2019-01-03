import { createActions } from 'redux-actions';
import { fetchClassItemList } from 'api';

export const { getClassItemList } = createActions({
  GET_CLASS_ITEM_LIST: [
    ({ id, page }) => {
      const promise = fetchClassItemList({ id, page });
      return { promise, data: { id } };
    },
    ({ page }) => ({ page }),
  ],
});
