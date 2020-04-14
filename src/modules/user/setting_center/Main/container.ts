import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Component from './component';
import { logoutAction } from '../actions';
import { configActions } from '@';

const mapStateToProps = (state: RootState) => ({
  isLogin: !!state.user.get('info').size,
  orientation: state.config.get('orientation'),
  mode: state.config.get('mode'),
  source: state.config.get('source', 3),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout() {
    return dispatch(logoutAction());
  },
  switchOrientation(params) {
    return dispatch(configActions.switchOrientation(params));
  },
  switchReadingMode(params) {
    return dispatch(configActions.switchReadingMode(params));
  },
  switchSource(params) {
    return dispatch(configActions.switchSource(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
