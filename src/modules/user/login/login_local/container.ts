import { connect } from 'react-redux';
import { loginForLocal } from '../actions';
import { favoritesListActions } from '@';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  loginLocal(params) {
    return dispatch(loginForLocal(params));
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
