import { connect } from 'react-redux';
import Component from './component';
import { logoutAction } from '../actions';
import { configActions } from '@';

const mapStateToProps = state => ({
  isLogin: !!state.user.get('info').size,
  orientation: state.config.get('orientation'),
  mode: state.config.get('mode'),
});

const mapDispatchToProps = dispatch => ({
  logout() {
    return dispatch(logoutAction());
  },
  switchOrientation(params) {
    return dispatch(configActions.switchOrientation(params));
  },
  switchReadingMode(params) {
    return dispatch(configActions.switchReadingMode(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
