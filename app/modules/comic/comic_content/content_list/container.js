import { connect } from 'react-redux';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import Component from './component';
import {
  getContentList,
  preContentList,
  saveContentIndex,
  saveHistory,
} from '../actions';

const downloadListSelector = state => state.favorites.get('download_list');
const comicIdSelector = state => state.comic.getIn(['detail', 'id']);
const chapterIdSelector = (state, ownProps) => ownProps.chapter_id;
const listMapSelector = createSelector(
  [downloadListSelector, comicIdSelector],
  (list, comic_id) => list && list.find(i => i.get('id') === comic_id, null, Immutable.Map()).get('listMap'),
);
const hasCacheSelector = createSelector(
  [listMapSelector, chapterIdSelector],
  (list, chapter_id) => {
    if (!list) return false;
    return list.has(chapter_id);
  },
);
const mapStateToProps = (state, ownProps) => ({
  detail_chapter_id: state.comic.getIn(['detail', 'chapter_id']),
  content_index: state.comic.getIn(['detail', 'index']),
  pre_content: state.comic.get('pre_content'),
  go_to_flag: state.comic.get('go_to_flag'),
  mode: state.config.get('mode'),
  has_cache: hasCacheSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  getContent(params) {
    return dispatch(getContentList(params));
  },
  preContent(params) {
    return dispatch(preContentList(params));
  },
  saveIndex(params) {
    return dispatch(saveContentIndex(params));
  },
  postHistory(params) {
    return dispatch(saveHistory(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
