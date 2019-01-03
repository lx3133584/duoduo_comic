import { connect } from 'react-redux';
import { getComicDetail, useTheDetailCache, updateTheDetailCache } from '../actions';
import Component from './component';

const mapStateToProps = state => ({
  detail: state.comic.get('detail'),
  download_list: state.favorites.get('download_list'),
});

const mapDispatchToProps = dispatch => ({
  getDetail(params) {
    return dispatch(getComicDetail(params));
  },
  useCache(params) {
    return dispatch(useTheDetailCache(params));
  },
  updateCache(params) {
    return dispatch(updateTheDetailCache(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
