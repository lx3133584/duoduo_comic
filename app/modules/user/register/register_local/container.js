import { connect } from 'react-redux';
import { registerForLocal } from '../actions';
import { favoritesListActions } from '@';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  registerLocal(params) {
    return dispatch(registerForLocal(params));
  },
  getFavorites(params) {
    return dispatch(favoritesListActions.getFavoritesList(params));
  },
  getHistory(params) {
    return dispatch(favoritesListActions.getHistoryList(params));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
