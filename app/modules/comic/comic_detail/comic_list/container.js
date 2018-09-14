import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Component from './component';
import { getComicList } from '../actions';

const listSelector = state => state.comic.get('list');

const formatListSelector = createSelector(
  listSelector,
  list => list.toJS(),
);

const mapStateToProps = state => ({
  comic_id: state.comic.getIn(['detail', 'id']),
  list: formatListSelector(state),
  chapter_id: state.comic.getIn(['detail', 'chapter_id']),
});

const mapDispatchToProps = dispatch => ({
  getList(params) {
    return dispatch(getComicList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
