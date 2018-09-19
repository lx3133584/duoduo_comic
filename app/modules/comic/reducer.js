import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { comicDetailActions, comicContentActions } from '@/comic';

function saveChapterId(state, id) {
  return state.setIn(['detail', 'chapter_id'], id);
}
function saveChapterIndex(state, index) {
  return state.setIn(['detail', 'index'], index);
}

const initialState = Immutable.Map({
  detail: Immutable.Map(),
  list: Immutable.List(),
  content: Immutable.List(),
  content_total: 0,
  pre_content: Immutable.List(),
  pre_content_total: 0,
  go_to_flag: false, // 标志go_to_index被触发
});
export default handleActions({
  [`${comicDetailActions.getComicDetail}_PENDING`]: (state) => {
    state = state.update('detail', detail => detail.clear());
    return state.update('list', list => list.clear());
  },
  [`${comicDetailActions.getComicDetail}_FULFILLED`]:
    (state, action) => state.set('detail', Immutable.Map(action.payload.data)),
  [`${comicDetailActions.getComicList}_FULFILLED`]:
    (state, action) => state.set('list', Immutable.List(action.payload.data)),
  [`${comicDetailActions.addFavorite}_PENDING`]: (state) => {
    state = state.updateIn(['detail', 'collection_number'], num => +num + 1);
    return state.setIn(['detail', 'favorite_id'], 1);
  },
  [`${comicDetailActions.removeFavorite}_PENDING`]: (state) => {
    state = state.updateIn(['detail', 'collection_number'], num => +num - 1);
    return state.setIn(['detail', 'favorite_id'], 0);
  },
  [`${comicDetailActions.addScore}_PENDING`]: (state, action) => {
    let score_number;
    state = state.updateIn(['detail', 'score_number'], (num) => {
      score_number = +num;
      return +num + 1;
    });
    state = state.updateIn(
      ['detail', 'score'],
      score => (score_number * score + action.payload.score) / (score_number + 1),
    );
    return state.setIn(['detail', 'my_score'], action.payload.score);
  },
  [comicContentActions.preContentList]: (state, action) => {
    state = saveChapterId(state, action.payload);
    state = saveChapterIndex(state, 0);
    state = state.set('content', state.get('pre_content'));
    state = state.set('content_total', state.get('pre_content_total'));
    return state.update('pre_content', list => list.clear());
  },
  [`${comicContentActions.getContentList}_FULFILLED`]: (state, action) => {
    if (action.payload.pre) { // 预加载
      state = state.set('pre_content_total', action.payload.result.total);
      return state.set('pre_content', Immutable.List(action.payload.result.data));
    }
    if (action.payload.init) { // 初始化(非懒加载的情况)
      state = state.update('content', list => list.clear());
      state = saveChapterId(state, action.payload.id);
      state = state.set('content_total', action.payload.result.total);
    }
    return state.update('content', oldList => oldList.concat(action.payload.result.data));
  },
  [comicContentActions.saveContentIndex]: (state, action) => saveChapterIndex(state, action.payload),
  [comicContentActions.goToIndex]: (state, action) => {
    state = saveChapterIndex(state, action.payload);
    return state.update('go_to_flag', flag => !flag);
  },
  [`${comicContentActions.saveHistory}_PENDING`]: (state, action) => {
    state = saveChapterId(state, action.payload.chapter_id);
    return saveChapterIndex(state, action.payload.index);
  },
}, initialState);
