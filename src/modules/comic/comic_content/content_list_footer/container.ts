import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import getContentCache from 'selectors/get_cache';
import findNextChapterSelector from 'selectors/find_next_chapter';
import Component from './component';
import { getContentList } from '../actions';

const nextItemSelector = findNextChapterSelector(1);
const nextChapterIdSelector = createSelector(
  nextItemSelector,
  next => next && next.id,
);
const cacheSelector = getContentCache(nextChapterIdSelector);

const mapStateToProps = (state: RootState) => ({
  next: nextItemSelector(state),
  content_cache: cacheSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getList(params: any) {
    return dispatch(getContentList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
