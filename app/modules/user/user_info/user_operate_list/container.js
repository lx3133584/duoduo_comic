import { connect } from 'react-redux';
import Component from './component';
import { logoutAction } from '../actions';

const mapStateToProps = state => ({
  info: state.user.get('info'),
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
