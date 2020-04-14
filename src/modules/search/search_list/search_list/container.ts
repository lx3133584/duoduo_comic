import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getSearchList, clearSearchList } from '../actions';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  list: state.search.get('list'),
  keyword: state.search.get('keyword'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  search(params: any) {
    return dispatch(getSearchList(params));
  },
  clear() {
    return dispatch(clearSearchList());
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
