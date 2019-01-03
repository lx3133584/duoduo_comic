import { connect } from 'react-redux';
import Component from './component';
import { getUserInfo } from '../actions';

const mapStateToProps = state => ({
  info: state.user.get('info'),
});

const mapDispatchToProps = dispatch => ({
  getUser() {
    return dispatch(getUserInfo());
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
