import { createActions } from 'redux-actions';
import { searchLocal } from 'api';

export const { getSearchList } = createActions({
  GET_SEARCH_LIST: async ({ keyword, page }) => {
    const result = await searchLocal({ keyword, page });
    return { result, keyword, page };
  },
});
