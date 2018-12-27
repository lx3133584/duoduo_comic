import { createActions } from 'redux-actions';
import { fetchContentList, postHistory } from 'api';

export const {
  getContentList,
  preContentList,
  saveContentIndex,
  saveHistory,
  goToIndex,
  useTheContentCache,
} = createActions({
  GET_CONTENT_LIST: async ({
    id, pre, page, init,
  }) => {
    const result = await fetchContentList({
      id, page,
    });
    return {
      result, id, pre, page, init,
    };
  },
  PRE_CONTENT_LIST: ID => ID,
  SAVE_CONTENT_INDEX: index => index,
  SAVE_HISTORY: ({ chapter_id, index }) => {
    const promise = postHistory({ chapter_id, index });
    return {
      promise, data: { chapter_id, index },
    };
  },
  GO_TO_INDEX: index => index,
  USE_THE_CONTENT_CACHE: ({ id, content }) => ({ id, content }),
});
