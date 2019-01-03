import { connect } from 'react-redux';
import Component from './component';
import { getComicList, useTheListCache, updateTheListCache } from '../actions';

const mapStateToProps = state => ({
  comic_id: state.comic.getIn(['detail', 'id']),
  list: state.comic.get('list'),
  chapter_id: state.comic.getIn(['detail', 'chapter_id']),
  download_list: state.favorites.get('download_list'),
});

const mapDispatchToProps = dispatch => ({
  getList(params) {
    return dispatch(getComicList(params));
  },
  useCache(params) {
    return dispatch(useTheListCache(params));
  },
  updateCache(params) {
    return dispatch(updateTheListCache(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
