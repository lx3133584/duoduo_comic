import { RootState } from 'store';
import { createSelector } from 'reselect';

const listSelector = (state: RootState) => state.comic.get('list');
const chapterIdSelector = (state: RootState) => state.comic.getIn(['detail', 'chapter_id']);
const chaptersSelector = createSelector(
  listSelector,
  (list) => {
    let chapters = [];
    list.forEach(({ data }) => {
      chapters = chapters.concat(data);
    });
    return chapters;
  }
);
const indexSelector = createSelector(
  [chaptersSelector, chapterIdSelector],
  (chapters, id) => {
    let cur_index = 0;
    chapters.forEach((item, index) => {
      if (item.id === id) cur_index = index;
    });
    return cur_index;
  }
);
export default (step) => createSelector(
  [chaptersSelector, indexSelector],
  (chapters, index) => chapters[index + step]
);
