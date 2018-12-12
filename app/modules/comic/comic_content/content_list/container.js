import { connect } from 'react-redux';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import Component from './component';
import {
  getContentList,
  preContentList,
  saveContentIndex,
  useTheContentCache,
} from '../actions';

const newMap = Immutable.Map();
const newList = Immutable.List();
const downloadListSelector = state => state.favorites.get('download_list', newList);
const comicIdSelector = state => state.comic.getIn(['detail', 'id']);
const chapterIdSelector = (state, ownProps) => ownProps.chapter_id;
const listMapSelector = createSelector(
  [downloadListSelector, comicIdSelector],
  (list, comic_id) => list.find(i => i.get('id') === comic_id, null, newMap).get('listMap', newMap),
);
const cacheSelector = createSelector(
  [listMapSelector, chapterIdSelector],
  (list, chapter_id) => {
    const chapter = list.get(chapter_id, newMap);
    const map = chapter.get('contentMap', newMap);
    if (!map.size) return null;
    return map.toList().toJS();
  },
);
const mapStateToProps = (state, ownProps) => ({
  detail_chapter_id: state.comic.getIn(['detail', 'chapter_id']),
  content_index: state.comic.getIn(['detail', 'index']),
  pre_content: state.comic.get('pre_content'),
  go_to_flag: state.comic.get('go_to_flag'),
  mode: state.config.get('mode'),
  content_cache: cacheSelector(state, ownProps),
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
  useCache(params) {
    return dispatch(useTheContentCache(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
