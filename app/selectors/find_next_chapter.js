import { createSelector } from 'reselect';

const listSelector = state => state.comic.get('list');
const chapterIdSelector = state => state.comic.getIn(['detail', 'chapter_id']);
const chaptersSelector = createSelector(
  listSelector,
  (list) => {
    let chapters = [];
    list.forEach(({ data }) => {
      chapters = chapters.concat(data);
    });
    return chapters;
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
export default step => createSelector(
  [chaptersSelector, indexSelector],
  (chapters, index) => {
    if (index === 0) return 0;
    return chapters[index + step];
  },
);
