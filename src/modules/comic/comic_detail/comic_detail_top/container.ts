import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getComicCache } from 'selectors/get_cache';
import { getComicDetail, useTheDetailCache, updateTheDetailCache } from '../actions';
import Component from './component';

interface IOwnProps {
  id: number;
  hideLoading(bool?: boolean): void;
}

const comicIdSelector = (state: RootState, ownProps: IOwnProps) => ownProps.id;
const comicCacheSelector = getComicCache(comicIdSelector);
const mapStateToProps = (state: RootState, ownProps: IOwnProps) => ({
  detail: state.comic.get('detail'),
  comic_cache: comicCacheSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
export type ContainerType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IOwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
