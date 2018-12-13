import { connect } from 'react-redux';
import getCache from 'selectors/get_cache';
import Component from './component';
import {
  getContentList,
  preContentList,
  saveContentIndex,
  useTheContentCache,
} from '../actions';

const chapterIdSelector = (state, ownProps) => ownProps.chapter_id;
const cacheSelector = getCache(chapterIdSelector);
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
