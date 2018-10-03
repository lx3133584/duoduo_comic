import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Component from './component';
import { saveContentIndex } from '../actions';
import { getImgHeight } from 'utils';

const contentSelector = state => state.comic.get('content');
const widthSelector = state => state.config.get('width');

const formatContentSelector = createSelector(
  contentSelector,
  list => list.toArray(),
);

const imageUrlsSelector = createSelector(
  [formatContentSelector, widthSelector],
  (list, width) => list.map((item) => {
    item.height = getImgHeight(item.size, width);
    item.width = width;
    return item;
  }),
);

const mapStateToProps = state => ({
  content: imageUrlsSelector(state),
  content_index: state.comic.getIn(['detail', 'index']),
  width: state.config.get('width'),
  total: state.comic.get('content_total'),
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
