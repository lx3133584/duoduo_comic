import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { favoritesListActions, downloadSelectActions } from '.';
import { comicDetailActions } from '@/comic';
import { settingCenterActions } from '@/user';
import { statCount } from 'utils';

function findIndex(list: Immutable.List<Immutable.Map<'id', number>>, id: number) { // 通过id找到index
  return list.findIndex((item) => item.get('id') === id);
}

function formatMap<T extends IItem>(list: T[], extraItem: IData) { // 格式化数组 -> 以id为key的Map
  return Immutable.Map<string, any>().withMutations((m) => {
    list.forEach((item) => {
      m.set(item.id || item.index, Immutable.Map({
        ...item,
        ...extraItem, // 添加额外的item属性
      }));
    });
  });
}

function computeParentStatus(map) { // 统计子元素各状态数量计算父元素状态
  const total = map.size;
  const stat = statCount(map.toList());
  if (stat.ready === total) return 'ready';
  if (stat.downloading) return 'downloading';
  if (stat.fetching) return 'fetching';
  if (stat.fetched) return 'fetched';
  if (stat.error) return 'error';
  if (stat.done === total) return 'done';
  return 'downloading';
}

const initialState = Immutable.Record({
  favorites_list: Immutable.List<Comic>(),
  history_list: Immutable.List<Comic>(),
  download_list: Immutable.List(),
})();
export type StateType = typeof initialState;
export default handleActions({
  [`${favoritesListActions.getFavoritesList}_FULFILLED`]:
    (state, action: any) => state.set('favorites_list', Immutable.List(action.payload.data)),
  [`${favoritesListActions.getHistoryList}_FULFILLED`]: (state, action: any) => state.withMutations((map) => {
    if (!action.payload.page) {
      map.update('history_list', (list) => list.clear());
    }
    map.update('history_list', (list) => list.concat(action.payload.result.data));
  }),
  [`${favoritesListActions.removeHistory}_PENDING`]:
    (state, action: any) => state.update('history_list', (list) => list.filter(((item) => item.id !== action.payload))),
  [`${comicDetailActions.removeFavorite}_PENDING`]:
    (state, action: any) =>
    state.update('favorites_list', (list) => list.filter(((item) => item.id !== action.payload))),
  [`${settingCenterActions.logoutAction}_PENDING`]: (state) => state.withMutations((map) => map
    .update('history_list', (list) => list.clear())
    .update('favorites_list', (list) => list.clear())),
  [downloadSelectActions.addDownload as any]: (state, action: any) => {
    const { detail, list, selectedList } = action.payload;
    const listMap = formatMap(selectedList, { status: 'ready' });
    return state.update('download_list', (l) => {
      const index = l.findIndex((i) => i.get('id') === detail.get('id'));
      if (!~index) { // 下载列表是否已经存在
        const d = detail.withMutations((m) => m
          .set('download_status', 'ready')
          .set('list', list) // 储存目录
          .set('listMap', listMap));
        return l.push(d);
      }
      return l.update(index, (dd) => dd.mergeDeep(detail));
    });
  },
  [`${downloadSelectActions.fetchDownloadContent}_PENDING`]:
    (state, action: any) => state.update('download_list', (list) => {
      const { id, comic_id } = action.payload;
      const index = findIndex(list, comic_id); // 找到漫画所在位置
      if (!~index) return list;
      return list.setIn([index, 'listMap', id, 'status'], 'fetching')
        .update(index, (map) => map.set('download_status', computeParentStatus(map.get('listMap'))));
    }),
  [`${downloadSelectActions.fetchDownloadContent}_FULFILLED`]:
    (state, action: any) => state.update('download_list', (list) => {
      const { id, comic_id, result } = action.payload;
      const contentMap = formatMap(result.data, { status: 'ready' });
      const index = findIndex(list, comic_id); // 找到漫画所在位置
      if (!~index) return list;
      return list.withMutations((m) => m
        .setIn([index, 'listMap', id, 'contentMap'], contentMap)
        .setIn([index, 'listMap', id, 'status'], 'fetched')
        .update(index, (map) => map.set('download_status', computeParentStatus(map.get('listMap')))));
    }),
  [`${downloadSelectActions.downloadComicImg}_PENDING`]:
    (state, action: any) => state.update('download_list', (list) => {
      const { comic_id, chapter_id, index } = action.payload;
      const i = findIndex(list, comic_id); // 找到漫画所在位置
      if (!~i) return list;
      return list.withMutations((m) => m
        .setIn([i, 'download_status'], 'downloading')
        .setIn([i, 'listMap', chapter_id, 'status'], 'downloading')
        .setIn([i, 'listMap', chapter_id, 'contentMap', index, 'status'], 'downloading'));
    }),
  [`${downloadSelectActions.downloadComicImg}_FULFILLED`]:
    (state, action: any) => state.update('download_list', (list) => {
      const {
        comic_id, chapter_id, index, result,
      } = action.payload;
      const i = findIndex(list, comic_id); // 找到漫画所在位置
      if (!~i) return list;
      return list.withMutations((m) => m
        .setIn([i, 'listMap', chapter_id, 'contentMap', index, 'status'], 'done')
        .setIn([i, 'listMap', chapter_id, 'contentMap', index, 'path'], result)
        .updateIn([i, 'listMap', chapter_id], (map) => map.set('status', computeParentStatus(map.get('contentMap'))))
        .update(i, (map) => map.set('download_status', computeParentStatus(map.get('listMap')))));
    }),
  [comicDetailActions.updateTheDetailCache as any]:
    (state, action: any) => state.update('download_list', (list) => {
      const { id, data } = action.payload;
      const index = findIndex(list, id); // 找到漫画所在位置
      if (!~index) return list;
      return list.update(index, (m) => m.merge(data));
    }),
  [comicDetailActions.updateTheListCache as any]:
    (state, action: any) => state.update('download_list', (list) => {
      const { id, data } = action.payload;
      const index = findIndex(list, id); // 找到漫画所在位置
      if (!~index) return list;
      return list.setIn([index, 'list'], Immutable.List(data));
    }),
  [favoritesListActions.removeDownloadComicFulfilled as any]:
    (state, action: any) => state.update('download_list', (list) => {
      const index = findIndex(list, action.payload); // 找到漫画所在位置
      if (!~index) return list;
      return list.delete(index);
    }),
  [favoritesListActions.removeDownloadContentFulfilled as any]:
    (state, action: any) => state.update('download_list', (list) => {
      const { id, comic_id } = action.payload;
      const index = findIndex(list, comic_id); // 找到漫画所在位置
      if (!~index) return list;
      return list.updateIn([index, 'listMap'], (map) => map.delete(id));
    }),
}, initialState);
