import { connect } from 'react-redux';
import Component from './component';
import { logoutAction } from '../actions';

const mapStateToProps = state => ({
  isLogin: !!state.user.get('info').size,
  orientation: state.config.get('orientation'),
});

const mapDispatchToProps = dispatch => ({
  logout() {
    return dispatch(logoutAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
