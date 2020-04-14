import { connect } from 'react-redux';
import { getHistoryList, removeHistory } from '../actions';
import Component from './component';

const mapStateToProps = state => ({
  list: state.favorites.get('history_list'),
});

const mapDispatchToProps = dispatch => ({
  getList(params) {
    return dispatch(getHistoryList(params));
  },
  remove(params) {
    return dispatch(removeHistory(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
