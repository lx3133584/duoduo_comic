import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import getCache from 'selectors/get_cache';
import findNextChapterSelector from 'selectors/find_next_chapter';
import Component from './component';
import { getContentList } from '../actions';

const nextItemSelector = findNextChapterSelector(1);
const nextChapterIdSelector = createSelector(
  nextItemSelector,
  next => next && next.id,
);
const cacheSelector = getCache(nextChapterIdSelector);

const mapStateToProps = (state, ownProps) => ({
  next: nextItemSelector(state),
  content_cache: cacheSelector(state, ownProps),
  is_show_footer: state.comic.get('is_show_footer'),
});

const mapDispatchToProps = dispatch => ({
  getList(params) {
    return dispatch(getContentList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
