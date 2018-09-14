import { createActions } from 'redux-actions';
import { fetchContentList, postHistory } from 'api';

export const {
  getContentList,
  preContentList,
  saveChapterTitle,
  saveContentIndex,
  saveHistory,
  goToIndex,
} = createActions({
  GET_CONTENT_LIST: async ({
    id, pre, page, init,
  }) => {
    const result = await fetchContentList({ id, page, pre });
    return {
      result, id, pre, page, init,
    };
  },
  PRE_CONTENT_LIST: ID => ID,
  SAVE_CHAPTER_TITLE: name => name,
  SAVE_CONTENT_INDEX: index => index,
  SAVE_HISTORY: async ({ chapter_id, index }) => {
    await postHistory({ chapter_id, index });
  },
  GO_TO_INDEX: index => index,
});
