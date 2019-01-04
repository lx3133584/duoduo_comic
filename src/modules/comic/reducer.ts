import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { comicDetailActions, comicContentActions } from '@/comic';

// export type ComicState = Immutable.Map<{
//   detail: Immutable.List
// }>
const initialState = Immutable.Record({
  detail: Immutable.Map(),
  list: Immutable.List(),
  content: Immutable.List(),
  content_total: 0,
  is_show_footer: false, // 标志是否显示footer(阅读完成，前往下一章)
  pre_content: Immutable.List(),
  pre_content_total: 0,
  go_to_flag: false, // 标志go_to_index被触发
})();
export default handleActions({
  [`${comicDetailActions.getComicDetail}_PENDING`]: (state) => state.withMutations((map) => map
    .update('detail', (detail) => detail.clear())
    .update('list', (list) => list.clear())),
  [`${comicDetailActions.getComicDetail}_FULFILLED`]:
    (state, action: any) => state.set('detail', Immutable.Map(action.payload.data)),
  [comicDetailActions.useTheDetailCache as any]:
    (state, action: any) => state.set('detail', action.payload),
  [`${comicDetailActions.getComicList}_FULFILLED`]:
    (state, action: any) => state.set('list', Immutable.List(action.payload.data)),
  [comicDetailActions.useTheListCache as any]:
    (state, action: any) => state.set('list', action.payload),
  [`${comicDetailActions.addFavorite}_PENDING`]: (state) => state.withMutations((map) => map
    .updateIn(['detail', 'collection_number'], (num) => +num + 1)
    .setIn(['detail', 'favorite_id'], 1)),
  [`${comicDetailActions.removeFavorite}_PENDING`]: (state) => state.withMutations((map) => map
    .updateIn(['detail', 'collection_number'], (num) => +num - 1)
    .setIn(['detail', 'favorite_id'], 0)),
  [`${comicDetailActions.addScore}_PENDING`]: (state, action: any) => state.withMutations((map) => {
    let score_number;
    map.updateIn(['detail', 'score_number'], (num) => {
      score_number = +num;
      return +num + 1;
    })
      .updateIn(
        ['detail', 'score'],
        (score) => (score_number * score + action.payload.score) / (score_number + 1),
      )
      .setIn(['detail', 'my_score'], action.payload.score);
  }),
  [comicContentActions.preContentList as any]: (state, action: any) => state.withMutations((map) => map
    .setIn(['detail', 'chapter_id'], action.payload)
    .setIn(['detail', 'index'], 0)
    .set('content', state.get('pre_content'))
    .set('content_total', state.get('pre_content_total'))
    .update('pre_content', (list) => list.clear())),
  [`${comicContentActions.getContentList}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    const {
      pre, init, result, id,
    } = action.payload;
    const { data = [] } = result;
    if (pre) { // 预加载
      map.set('pre_content_total', result.total)
        .set('pre_content', Immutable.List(data));
      return;
    }
    if (init) { // 初始化(非懒加载的情况)
      map.update('content', (list) => list.clear())
        .setIn(['detail', 'chapter_id'], id)
        .set('is_show_footer', false)
        .set('content_total', result.total);
    }
    if (!data.length) { // 加载完成，最后一页
      map.set('is_show_footer', true);
      return;
    }
    map.update('content', (oldList) => oldList.concat(data));
  }),
  [comicContentActions.useTheContentCache as any]: (state, action: any) => state.withMutations((map) => map
    .set('content', Immutable.List(action.payload.content))
    .set('content_total', action.payload.content.length)
    .setIn(['detail', 'chapter_id'], action.payload.id)
    .set('is_show_footer', true)),
  [comicContentActions.saveContentIndex as any]: (state, action: any) =>
  state.setIn(['detail', 'index'], action.payload),
  [comicContentActions.goToIndex as any]: (state, action: any) => state.withMutations((map) => map
    .setIn(['detail', 'index'], action.payload)
    .update('go_to_flag', (flag) => !flag)),
}, initialState);
