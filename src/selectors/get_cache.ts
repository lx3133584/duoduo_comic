import Immutable from 'immutable';
import { createSelector } from 'reselect';

const newMap = Immutable.Map();
const newList = Immutable.List();
const downloadListSelector = (state) => state.favorites.get('download_list', newList);
const comicIdSelector = (state) => state.comic.getIn(['detail', 'id']);
// const chapterIdSelector = (state, ownProps) => ownProps.chapter_id;
const listMapSelector = createSelector(
  [downloadListSelector, comicIdSelector],
  (list, comic_id) => list.find((i) => i.get('id') === comic_id, null, newMap).get('listMap', newMap),
);
export default (chapterIdSelector) => createSelector(
  [listMapSelector, chapterIdSelector],
  (list, chapter_id) => {
    const chapter = list.get(chapter_id, newMap);
    const map = chapter.get('contentMap', newMap);
    if (!map.size) return null;
    return map.toList().toJS();
  },
);
