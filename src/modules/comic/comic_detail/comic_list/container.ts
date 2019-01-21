import Immutable from 'immutable';
import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getComicCache } from 'selectors/get_cache';
import Component from './component';
import { getComicList, useTheListCache, updateTheListCache } from '../actions';

interface IOwnProps {
  id?: number;
  dark?: boolean;
  isReplace?: boolean;
  changeCheckbox?: (id: number) => void;
  showCheckbox?: boolean;
  checkboxData?: Immutable.Map<any, any>;
}
const comicIdSelector = (state: RootState, ownProps: IOwnProps) => ownProps.id || state.comic.getIn(['detail', 'id']);
const comicCacheSelector = getComicCache(comicIdSelector);
const listMapSelector = createSelector(
  [comicCacheSelector],
  (comicCache) => comicCache && comicCache.get('listMap'),
);
const listSelector = createSelector(
  [comicCacheSelector],
  (comicCache) => comicCache && comicCache.get('list'),
);
const mapStateToProps = (state: RootState, ownProps: IOwnProps) => ({
  comic_id: comicIdSelector(state, ownProps),
  list: state.comic.get('list'),
  chapter_id: state.comic.getIn(['detail', 'chapter_id']),
  comic_list_map_cache: listMapSelector(state, ownProps),
  comic_list_cache: listSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
export type ContainerType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IOwnProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
