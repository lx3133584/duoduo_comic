import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Component from './component';
import { addDownload } from '../actions';

const listSelector = (state: RootState) => state.comic.get('list');

const flatListSelector = createSelector(
  listSelector,
  list => list.flatMap(item => item.data),
);

const mapStateToProps = (state: RootState) => ({
  detail: state.comic.get('detail'),
  list: state.comic.get('list'),
  flatList: flatListSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add(params) {
    return dispatch(addDownload(params));
  },
});
export type ContainerType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
