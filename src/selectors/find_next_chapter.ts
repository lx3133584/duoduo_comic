import { RootState } from 'store';
import { createSelector } from 'reselect';

const listSelector = (state: RootState) => state.comic.get('list');
const chapterIdSelector = (state: RootState) => state.comic.getIn(['detail', 'chapter_id']);
const chaptersSelector = createSelector(
  listSelector,
  (list) => {
    return list.flatMap(item => item.data);
  },
);
const indexSelector = createSelector(
  [chaptersSelector, chapterIdSelector],
  (chapters, id) => {
    let cur_index = 0;
    chapters.forEach((item, index) => {
      if (item.id === id) cur_index = index;
    });
    return cur_index;
  },
);
export default (step: number) => createSelector(
  [chaptersSelector, indexSelector],
  (chapters, index) => chapters.get(index + step),
);
