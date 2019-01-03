import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Component from './component';
import { addDownload } from '../actions';

const listSelector = state => state.comic.get('list');

const flatListSelector = createSelector(
  listSelector,
  list => list.flatMap(item => item.data),
);

const mapStateToProps = state => ({
  detail: state.comic.get('detail'),
  list: state.comic.get('list'),
  flatList: flatListSelector(state),
});

const mapDispatchToProps = dispatch => ({
  add(params) {
    return dispatch(addDownload(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
