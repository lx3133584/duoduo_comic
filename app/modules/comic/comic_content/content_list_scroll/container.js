import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getImgHeight } from 'utils';
import Component from './component';
import { saveContentIndex } from '../actions';

const contentSelector = state => state.comic.get('content');
const widthSelector = state => state.config.get('width');

const formatContentSelector = createSelector(
  contentSelector,
  list => list.toArray(),
);

const imgPositonArrSelector = createSelector(
  [contentSelector, widthSelector],
  (list, width) => {
    const imgHeightArr = list.map(item => getImgHeight(item.size, width));
    return imgHeightArr.map((item, index) => imgHeightArr.slice(0, index).reduce((total, cur) => total + cur, 0));
  },
);

const mapStateToProps = state => ({
  content: formatContentSelector(state),
  img_positon_arr: imgPositonArrSelector(state),
  content_index: state.comic.getIn(['detail', 'index']),
  width: widthSelector(state),
});

const mapDispatchToProps = dispatch => ({
  saveIndex(params) {
    return dispatch(saveContentIndex(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
