import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getImgHeight } from 'utils';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';
import { saveContentIndex } from '../actions';

const contentSelector = (state: RootState) => state.comic.get('content');
const widthSelector = (state: RootState) => windowSizeSelector(state).width;

const formatContentSelector = createSelector(
  contentSelector,
  list => list.toArray(),
);

const imageUrlsSelector = createSelector(
  [formatContentSelector, widthSelector],
  (list, width) => list.map((item) => {
    item.props = { ...item };
    item.height = getImgHeight(item.size, width);
    item.width = width;
    return item;
  }),
);

const mapStateToProps = (state: RootState) => ({
  content: imageUrlsSelector(state),
  content_index: state.comic.getIn(['detail', 'index']),
  width: windowSizeSelector(state).width,
  total: state.comic.get('content_total'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveIndex(params) {
    return dispatch(saveContentIndex(params));
  },
});
export type ContainerType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
