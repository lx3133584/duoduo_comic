import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { comicDetailActions, comicContentActions } from '@/comic';

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
  [`${comicDetailActions.getComicDetail}_PENDING`]: state => state.withMutations(map => map
    .update('detail', detail => detail.clear())
    .update('list', list => list.clear())),
  [`${comicDetailActions.getComicDetail}_FULFILLED`]:
    (state, action) => state.set('detail', Immutable.Map(action.payload.data)),
  [comicDetailActions.useTheDetailCache]:
    (state, action) => state.set('detail', action.payload),
  [`${comicDetailActions.getComicList}_FULFILLED`]:
    (state, action) => state.set('list', Immutable.List(action.payload.data)),
  [comicDetailActions.useTheListCache]:
    (state, action) => state.set('list', action.payload),
  [`${comicDetailActions.addFavorite}_PENDING`]: state => state.withMutations(map => map
    .updateIn(['detail', 'collection_number'], num => +num + 1)
    .setIn(['detail', 'favorite_id'], 1)),
  [`${comicDetailActions.removeFavorite}_PENDING`]: state => state.withMutations(map => map
    .updateIn(['detail', 'collection_number'], num => +num - 1)
    .setIn(['detail', 'favorite_id'], 0)),
  [`${comicDetailActions.addScore}_PENDING`]: (state, action) => state.withMutations((map) => {
    let score_number;
    map.updateIn(['detail', 'score_number'], (num) => {
      score_number = +num;
      return +num + 1;
    })
      .updateIn(
        ['detail', 'score'],
        score => (score_number * score + action.payload.score) / (score_number + 1),
      )
      .setIn(['detail', 'my_score'], action.payload.score);
  }),
  [comicContentActions.preContentList]: (state, action) => state.withMutations(map => map
    .setIn(['detail', 'chapter_id'], action.payload)
    .setIn(['detail', 'index'], 0)
    .set('content', state.get('pre_content'))
    .set('content_total', state.get('pre_content_total'))
    .update('pre_content', list => list.clear())),
  [`${comicContentActions.getContentList}_FULFILLED`]: (state, action) => state.withMutations((map) => {
    if (action.payload.pre) { // 预加载
      map.set('pre_content_total', action.payload.result.total)
        .set('pre_content', Immutable.List(action.payload.result.data));
    }
    if (action.payload.init) { // 初始化(非懒加载的情况)
      map.update('content', list => list.clear())
        .setIn(['detail', 'chapter_id'], action.payload.id)
        .set('content_total', action.payload.result.total);
    }
    map.update('content', oldList => oldList.concat(action.payload.result.data));
  }),
  [comicContentActions.saveContentIndex]: (state, action) => state.setIn(['detail', 'index'], action.payload),
  [comicContentActions.goToIndex]: (state, action) => state.withMutations(map => map
    .setIn(['detail', 'index'], action.payload)
    .update('go_to_flag', flag => !flag)),
  [`${comicContentActions.saveHistory}_PENDING`]: (state, action) => state.withMutations(map => map
    .setIn(['detail', 'chapter_id'], action.payload.chapter_id)
    .setIn(['detail', 'index'], action.payload.index)),
}, initialState);
