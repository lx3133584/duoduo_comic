import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Component from './component';
import { goToIndex } from '../actions';

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
const prevItemSelector = createSelector(
  [chaptersSelector, indexSelector],
  (chapters, index) => {
    if (index === 0) return 0;
    return chapters[index - 1];
  },
);
const nextItemSelector = createSelector(
  [chaptersSelector, indexSelector],
  (chapters, index) => {
    if (index === chapters.length - 1) return 0;
    return chapters[index + 1];
  },
);

const mapStateToProps = state => ({
  index: state.comic.getIn(['detail', 'index']),
  total: state.comic.get('content_total'),
  prev: prevItemSelector(state),
  next: nextItemSelector(state),
  width: state.config.get('width'),
});

const mapDispatchToProps = dispatch => ({
  goIndex(params) {
    return dispatch(goToIndex(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
