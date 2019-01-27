import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { RootState } from 'store';

const newMap = Immutable.Map();
const newList = Immutable.List();
const downloadListSelector = (state: RootState) => state.favorites.get('download_list', newList);
const comicIdSelector = (state: RootState) => state.comic.getIn(['detail', 'id']);
type IIdSelector = (state: RootState, ownProps?: any) => number | undefined;
export const getComicCache = (
  myComicIdSelector: IIdSelector = comicIdSelector,
) => createSelector(
  [downloadListSelector, myComicIdSelector],
  (list, comic_id) => list.find((i) => i.get('id') === comic_id, null),
);
// const chapterIdSelector = (state, ownProps) => ownProps.chapter_id;
const listMapSelector = createSelector(
  [getComicCache()],
  (comicCache) => comicCache ? comicCache.get('listMap', newMap) : newMap,
);
// content cache
export default (
  chapterIdSelector: IIdSelector,
) => createSelector(
  [listMapSelector, chapterIdSelector],
  (list, chapter_id) => {
    const chapter = list.get(chapter_id, newMap);
    const map = chapter.get('contentMap', newMap);
    if (!map.size) return null;
    return map.toList().toJS();
  },
);
