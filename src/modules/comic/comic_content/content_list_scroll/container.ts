import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getImgHeight } from 'utils';
import windowSizeSelector from 'selectors/window_size';
import Component from './component';
import { saveContentIndex } from '../actions';

interface IOwnProps {
  page: number;
  offset: number;
  noMoreData: boolean;
  onRefresh(): void;
  onFetch(page: number, init?: boolean): Promise<any>;
  increasePage(page?: number): void;
}

const contentSelector = (state: RootState) => state.comic.get('content');
const widthSelector = (state: RootState) => windowSizeSelector(state).width;

const formatContentSelector = createSelector(
  contentSelector,
  list => list.toArray(),
);

const imgPositionArrSelector = createSelector(
  [contentSelector, widthSelector],
  (list, width) => {
    const imgHeightArr = list.map(item => getImgHeight(item.size, width));
    return imgHeightArr.map((item, index) => imgHeightArr.slice(0, index).reduce((total, cur) => total + cur, 0));
  },
);

const mapStateToProps = (state: RootState) => ({
  content: formatContentSelector(state),
  img_position_arr: imgPositionArrSelector(state),
  content_index: state.comic.getIn(['detail', 'index']),
  width: widthSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveIndex(params) {
    return dispatch(saveContentIndex(params));
  },
});

export type ContainerType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IOwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
